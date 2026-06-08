#!/usr/bin/env node
/**
 * career-ops API bridge
 * Runs locally on 100.95.236.57:3000 — accessible from hosted N8N via Tailscale.
 * N8N calls this for all file I/O and local script execution.
 * LLM work stays in N8N (OpenRouter).
 *
 * Usage:
 *   node api.mjs
 *   CAREER_OPS_API_PORT=3001 CAREER_OPS_API_SECRET=mykey node api.mjs
 *
 * Start as daemon:
 *   nohup node api.mjs >> logs/api.log 2>&1 &
 */
import http from 'http';
import { exec } from 'child_process';
import { readFile, writeFile, appendFile, mkdir, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.CAREER_OPS_API_PORT || '3000', 10);
const API_SECRET = process.env.CAREER_OPS_API_SECRET || '';

// ── Helpers ─────────────────────────────────────────────────────────

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

function respond(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function safePath(relative) {
  const normalized = path.normalize(relative).replace(/^(\/|\.\.\/)+/, '');
  const full = path.join(__dirname, normalized);
  if (!full.startsWith(__dirname)) throw new Error('path traversal blocked');
  return full;
}

function parsePending(content) {
  const results = [];
  for (const line of content.split('\n')) {
    const table = line.match(/^\|\s*(\d+)\s*\|\s*(https?:\/\/[^\s|]+)/);
    if (table) { results.push({ num: table[1], url: table[2].trim() }); continue; }
    const list = line.match(/^-\s*\[\s*\]\s*#?(\d+)\s*\|\s*(https?:\/\/\S+)/);
    if (list) results.push({ num: list[1], url: list[2].trim() });
  }
  return results;
}

// ── Routes ───────────────────────────────────────────────────────────

const routes = {};

// GET /health
routes['GET /health'] = async (req, res) => {
  respond(res, 200, { status: 'ok', version: '1.8.1', ts: new Date().toISOString() });
};

// GET /pipeline — list pending URLs
routes['GET /pipeline'] = async (req, res) => {
  const p = path.join(__dirname, 'data', 'pipeline.md');
  if (!existsSync(p)) { respond(res, 200, { pending: [], total: 0 }); return; }
  const content = await readFile(p, 'utf8');
  const pending = parsePending(content);
  respond(res, 200, { pending, total: pending.length });
};

// POST /pipeline — add URL to pipeline.md
routes['POST /pipeline'] = async (req, res, body) => {
  const { url, num, source = 'n8n', notes = '' } = body;
  if (!url) { respond(res, 400, { error: 'url required' }); return; }
  const date = new Date().toISOString().split('T')[0];
  const entry = `\n- [ ] #${num || '?'} | ${url} | ${source} | ${date} | ${notes}`;
  await appendFile(path.join(__dirname, 'data', 'pipeline.md'), entry, 'utf8');
  respond(res, 200, { added: true, entry: entry.trim() });
};

// POST /pipeline/complete — mark URL as done in pipeline.md (replace [ ] with [x])
routes['POST /pipeline/complete'] = async (req, res, body) => {
  const { url } = body;
  if (!url) { respond(res, 400, { error: 'url required' }); return; }
  const p = path.join(__dirname, 'data', 'pipeline.md');
  const content = await readFile(p, 'utf8');
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const updated = content.replace(new RegExp(`^(- \\[)\\s*(\\] #?\\d+ \\| ${escaped})`, 'm'), '$1x$2');
  await writeFile(p, updated, 'utf8');
  respond(res, 200, { done: true });
};

// POST /scan/history — append rows to scan-history.tsv
routes['POST /scan/history'] = async (req, res, body) => {
  const { rows } = body; // [{ url, portal, title, company, status, location }]
  if (!Array.isArray(rows) || rows.length === 0) { respond(res, 400, { error: 'rows array required' }); return; }
  const p = path.join(__dirname, 'data', 'scan-history.tsv');
  const date = new Date().toISOString().split('T')[0];
  const lines = rows.map(r =>
    `${r.url}\t${date}\t${r.portal || 'n8n'}\t${r.title || ''}\t${r.company || ''}\t${r.status || 'added'}\t${r.location || ''}`
  ).join('\n') + '\n';
  await appendFile(p, lines, 'utf8');
  respond(res, 200, { added: rows.length });
};

// POST /reports — write a report file
routes['POST /reports'] = async (req, res, body) => {
  const { filename, content } = body;
  if (!filename || !content) { respond(res, 400, { error: 'filename and content required' }); return; }
  const safe = path.basename(filename).replace(/[^a-zA-Z0-9\-_.]/g, '_');
  await writeFile(path.join(__dirname, 'reports', safe), content, 'utf8');
  respond(res, 200, { saved: `reports/${safe}` });
};

// GET /reports — list all reports
routes['GET /reports'] = async (req, res) => {
  const dir = path.join(__dirname, 'reports');
  if (!existsSync(dir)) { respond(res, 200, { reports: [] }); return; }
  const files = (await readdir(dir)).filter(f => f.endsWith('.md')).sort();
  respond(res, 200, { reports: files, total: files.length });
};

// POST /tracker — write TSV tracker entry
routes['POST /tracker'] = async (req, res, body) => {
  const { num, date, company, role, status, score, pdf = '❌', notes = '' } = body;
  if (!num || !company || !role) { respond(res, 400, { error: 'num, company, role required' }); return; }
  const d = date || new Date().toISOString().split('T')[0];
  const slug = company.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const reportLink = `[${num}](reports/${num}-${slug}-${d}.md)`;
  const tsv = [num, d, company, role, status, `${score}/5`, pdf, reportLink, notes].join('\t') + '\n';
  const dir = path.join(__dirname, 'batch', 'tracker-additions');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${num}-${slug}.tsv`), tsv, 'utf8');
  respond(res, 200, { saved: true });
};

// GET /tracker — read applications.md (for dashboard)
routes['GET /tracker'] = async (req, res) => {
  const p = path.join(__dirname, 'data', 'applications.md');
  if (!existsSync(p)) { respond(res, 200, { content: '', rows: [] }); return; }
  const content = await readFile(p, 'utf8');
  const rows = content.split('\n')
    .filter(l => l.match(/^\|\s*\d+/))
    .map(l => {
      const cols = l.split('|').map(c => c.trim()).filter(Boolean);
      return cols.length >= 8 ? {
        num: cols[0], date: cols[1], company: cols[2], role: cols[3],
        score: cols[4], status: cols[5], pdf: cols[6], report: cols[7], notes: cols[8] || '',
      } : null;
    })
    .filter(Boolean);
  respond(res, 200, { rows, total: rows.length });
};

// POST /cv/generate — generate PDF from HTML
routes['POST /cv/generate'] = async (req, res, body) => {
  const { html, output } = body;
  if (!html || !output) { respond(res, 400, { error: 'html and output required' }); return; }
  const safe = path.basename(output).replace(/[^a-zA-Z0-9\-_.]/g, '_');
  const tmpHtml = path.join(__dirname, 'output', `_tmp_${Date.now()}.html`);
  const outPdf = path.join(__dirname, 'output', safe);
  await mkdir(path.join(__dirname, 'output'), { recursive: true });
  await writeFile(tmpHtml, html, 'utf8');
  exec(
    `node generate-pdf.mjs "${tmpHtml}" "${outPdf}" --format=a4`,
    { cwd: __dirname, timeout: 60000 },
    async (err, stdout, stderr) => {
      try { await (await import('fs')).promises.unlink(tmpHtml); } catch { /**/ }
      if (err) { respond(res, 500, { error: err.message, stderr }); return; }
      respond(res, 200, { generated: `output/${safe}` });
    }
  );
};

// GET /files/:path — read any project file (path-traversal safe)
routes['GET /files'] = async (req, res) => {
  const relative = req.url.replace(/^\/files\/?/, '');
  if (!relative) { respond(res, 400, { error: 'path required' }); return; }
  try {
    const full = safePath(relative);
    if (!existsSync(full)) { respond(res, 404, { error: 'not found' }); return; }
    const content = await readFile(full, 'utf8');
    respond(res, 200, { path: relative, content });
  } catch (e) { respond(res, 403, { error: e.message }); }
};

// POST /run/scan — execute scan.mjs
routes['POST /run/scan'] = async (req, res) => {
  exec('node scan.mjs', { cwd: __dirname, timeout: 180000 }, (err, stdout, stderr) => {
    respond(res, err ? 500 : 200, { output: stdout, stderr, error: err?.message });
  });
};

// POST /run/merge — execute merge-tracker.mjs
routes['POST /run/merge'] = async (req, res) => {
  exec('node merge-tracker.mjs', { cwd: __dirname, timeout: 60000 }, (err, stdout, stderr) => {
    respond(res, err ? 500 : 200, { output: stdout, stderr, error: err?.message });
  });
};

// ── Server ───────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,X-API-Key' });
    res.end();
    return;
  }

  // Auth
  if (API_SECRET && req.headers['x-api-key'] !== API_SECRET) {
    respond(res, 401, { error: 'unauthorized' });
    return;
  }

  // Route matching — exact first, then prefix for /files
  const urlBase = req.url.split('?')[0].replace(/\/+$/, '') || '/';
  const key = `${req.method} ${urlBase}`;
  let handler = routes[key];

  if (!handler && urlBase.startsWith('/files/')) {
    handler = routes['GET /files'];
  }

  if (!handler) { respond(res, 404, { error: `no route: ${key}` }); return; }

  try {
    const body = await parseBody(req);
    await handler(req, res, body);
  } catch (err) {
    respond(res, 500, { error: err.message });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[career-ops API] listening on :${PORT}`);
  console.log(`[career-ops API] auth: ${API_SECRET ? 'enabled' : 'disabled (set CAREER_OPS_API_SECRET to enable)'}`);
});
