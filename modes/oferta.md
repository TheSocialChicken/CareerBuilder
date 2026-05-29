# Mode: job — Full A-H Evaluation

When the candidate pastes a job (text or URL), ALWAYS deliver the 8 blocks (A-F evaluation + G legitimacy + H culture/personality fit):

## Step 0 — Archetype Detection

Classify the job into one of the 6 archetypes (see `_shared.md`). If it is a hybrid, indicate the 2 closest ones. This determines:
- Which proof points to prioritize in block B
- How to rewrite the summary in block E
- Which STAR stories to prepare in block F

## Block A — Role Summary

Table with:
- Archetype detected
- Domain (platform/agentic/LLMOps/ML/enterprise)
- Function (build/consult/manage/deploy)
- Seniority
- Remote (full/hybrid/onsite)
- Team size (if mentioned)
- TL;DR in 1 sentence

## Block B — Match with CV

Read `cv.md`. Create a table with each JD requirement mapped to exact lines in the CV.

**Adapted to the archetype:**
- If FDE → prioritize delivery speed and client-facing proof points
- If SA → prioritize system design and integrations
- If PM → prioritize product discovery and metrics
- If LLMOps → prioritize evals, observability, pipelines
- If Agentic → prioritize multi-agent, HITL, orchestration
- If Transformation → prioritize change management, adoption, scaling

**Gaps** section with mitigation strategy for each. For each gap:
1. Is it a hard blocker or a nice-to-have?
2. Can the candidate demonstrate adjacent experience?
3. Is there a portfolio project that covers this gap?
4. Concrete mitigation plan (phrase for cover letter, quick project, etc.)

## Block C — Level and Strategy

1. **Level detected** in the JD vs **candidate's natural level for that archetype**
2. **"Sell senior without lying" plan**: specific phrases adapted to the archetype, concrete achievements to highlight, how to position founder experience as an advantage
3. **"If they downlevel me" plan**: accept if compensation is fair, negotiate 6-month review, clear promotion criteria

## Block D — Comp and Demand

Use WebSearch for:
- Current salaries for the role (Glassdoor, Levels.fyi, Blind)
- Company's compensation reputation
- Demand trend for the role

Table with data and cited sources. If there is no data, state it instead of inventing.

## Block E — Customization Plan

| # | Section | Current status | Proposed change | Why |
|---|---------|---------------|------------------|---------|
| 1 | Summary | ... | ... | ... |
| ... | ... | ... | ... | ... |

Top 5 changes to CV + Top 5 changes to LinkedIn to maximize match.

## Block F — Interview Plan

6-10 STAR+R stories mapped to JD requirements (STAR + **Reflection**):

| # | JD Requirement | STAR+R Story | S | T | A | R | Reflection |
|---|-----------------|-----------------|---|---|---|---|------------|

The **Reflection** column captures what was learned or what would be done differently. This signals seniority — junior candidates describe what happened, senior candidates extract lessons.

**Story Bank:** If `interview-prep/story-bank.md` exists, check if any of these stories are already there. If not, append new ones. Over time this builds a reusable bank of 5-10 master stories that can be adapted to any interview question.

**Selected and framed according to the archetype:**
- FDE → emphasize delivery speed and client-facing
- SA → emphasize architectural decisions
- PM → emphasize discovery and trade-offs
- LLMOps → emphasize metrics, evals, production hardening
- Agentic → emphasize orchestration, error handling, HITL
- Transformation → emphasize adoption, organizational change

Also include:
- 1 recommended case study (which of their projects to present and how)
- Red-flag questions and how to answer them (e.g., "why did you sell your company?", "do you have a team of reports?")

## Block G — Posting Legitimacy

Analyze the job posting for signals that indicate whether this is a real, active opening. This helps the user prioritize their effort on opportunities most likely to result in a hiring process.

**Ethical framing:** Present observations, not accusations. Every signal has legitimate explanations. The user decides how to weigh them.

### Signals to analyze (in order):

**1. Posting Freshness** (from Playwright snapshot, already captured in Step 0):
- Date posted or "X days ago" -- extract from page
- Apply button state (active / closed / missing / redirects to generic page)
- If URL redirected to generic careers page, note it

**2. Description Quality** (from JD text):
- Does it name specific technologies, frameworks, tools?
- Does it mention team size, reporting structure, or org context?
- Are requirements realistic? (years of experience vs technology age)
- Is there a clear scope for the first 6-12 months?
- Is salary/compensation mentioned?
- What ratio of the JD is role-specific vs generic boilerplate?
- Any internal contradictions? (entry-level title + staff requirements, etc.)

**3. Company Hiring Signals** (2-3 WebSearch queries, combine with Block D research):
- Search: `"{company}" layoffs {year}` -- note date, scale, departments
- Search: `"{company}" hiring freeze {year}` -- note any announcements
- If layoffs found: are they in the same department as this role?

**4. Reposting Detection** (from scan-history.tsv):
- Check if company + similar role title appeared before with a different URL
- Note how many times and over what period

**5. Role Market Context** (qualitative, no additional queries):
- Is this a common role that typically fills in 4-6 weeks?
- Does the role make sense for this company's business?
- Is the seniority level one that legitimately takes longer to fill?

### Output format:

**Assessment:** One of three tiers:
- **High Confidence** -- Multiple signals suggest a real, active opening
- **Proceed with Caution** -- Mixed signals worth noting
- **Suspicious** -- Multiple ghost job indicators, investigate before investing time

**Signals table:** Each signal observed with its finding and weight (Positive / Neutral / Concerning).

**Context Notes:** Any caveats (niche role, government job, evergreen position, etc.) that explain potentially concerning signals.

### Edge case handling:
- **Government/academic postings:** Longer timelines are standard. Adjust thresholds (60-90 days is normal).
- **Evergreen/continuous hire postings:** If the JD explicitly says "ongoing" or "rolling," note it as context -- this is not a ghost job, it is a pipeline role.
- **Niche/executive roles:** Staff+, VP, Director, or highly specialized roles legitimately stay open for months. Adjust age thresholds accordingly.
- **Startup / pre-revenue:** Early-stage companies may have vague JDs because the role is genuinely undefined. Weight description vagueness less heavily.
- **No date available:** If posting age cannot be determined and no other signals are concerning, default to "Proceed with Caution" with a note that limited data was available. NEVER default to "Suspicious" without evidence.
- **Recruiter-sourced (no public posting):** Freshness signals unavailable. Note that active recruiter contact is itself a positive legitimacy signal.

## Block H — Culture, Personality & Long-term Fit

This block answers a different question from A-G. Not "can Christiaan do this job?" but "is this actually a good environment for him, and will it still be good in 18 months?" Draw everything from `modes/_profile.md` — especially the Personality context, 2-year vision, known gaps, scoring implications, and "what he does for free" sections.

### H1 — Org Culture Assessment

Based on research from Blocks A, D, and G:

- **Stage and type:** startup / scaleup / SME / corporate / public institution / academic — and where on the build-vs-maintain spectrum
- **Culture signals:** What does the JD language, website tone, and public presence suggest about pace, autonomy, and decision speed?
- **Physical/work environment:** office, hybrid, co-working, lab, remote — and what that implies

Match against the 2-year vision from `_profile.md`: *"In a hackerspace. Small group. Building things. High trust. New territory."* Score the alignment explicitly.

### H2 — Personality Fit Table

Evaluate the role against Christiaan's ENFP-T + ADHD profile:

| Dimension | What the role requires | Christiaan's profile | Match |
|-----------|----------------------|---------------------|-------|
| Starter vs. finisher | [from JD] | ENFP-T starter — strongest 0→1 and 1→2 | [assess] |
| Variety vs. repetition | [from JD] | Thrives on variety, drains fast on repetition | [assess] |
| Autonomy level | [from JD] | Needs ownership, not execution-only | [assess] |
| Build vs. maintain | [from JD] | Builder identity — maintenance depletes energy | [assess] |
| Fractional fit | [hours/exclusivity from JD] | Optimal: 2-3 concurrent 0.4-0.6 FTE | [assess] |
| Energy spike tolerance | [from culture assessment] | Front-loaded high energy in first weeks — reads as chaos to people who don't know him | [assess] |
| Team size | [from JD] | Small team, high trust — large anonymous org is a penalty | [assess] |

**Flag automatically if:**
- Role is primarily maintenance/operations with no build mandate → "engagement risk"
- Role requires slow consensus-first onboarding → flag
- Role expects 100% focus from a single employer, no flexibility → "fractional conflict"
- Role is ceremony-only Scrum Master with no innovation mandate → flag

### H3 — Values & Mission Alignment

- What is this org building toward? What do they stand for?
- Does the mission connect to what Christiaan cares about intrinsically — innovation, learning systems, making people capable, frontier work?
- Would he talk about this work unprompted at a dinner party?
- Is this a role he'd do for less money if the work was right, or is it purely transactional?

Be direct. "This is purely a commercial engagement" is a valid answer.

### H4 — Energy Analysis

**Energizers for this role** (draw from "what he does for free" in `_profile.md`):
- Design/facilitation/building mandate → +energy
- Small team, high trust, shared world-building → +energy
- Domain on the frontier (AI, sustainability, identity, education, innovation) → +energy
- Something to build from scratch → +energy
- Talent to mentor or community to activate → +energy

**Likely drains**:
- Maintenance without a new challenge → drain
- Heavy process compliance with no creative space → drain
- Large corporate with slow decision cycles and low individual visibility → drain
- Being the sole builder with no community forming around the work → drain
- Full-time exclusivity preventing the multi-engagement model → drain

List which apply concretely to this role.

### H5 — 18-Month Durability Test

If this role goes well, will it still feel right in 18 months? Consider:
- Is there a natural growth path, or will the role plateau after the initial build phase?
- Does the org type match the 2-year vision, or is this a stepping stone?
- Is the fractional model sustainable long-term here, or will the org push for more commitment?
- What happens after the thing is built — does the job become maintenance?

Rate one of: **Sustainable** / **Short-term fit (stepping stone, valid reason)** / **Plateau risk after build phase**

### H6 — Personality-Specific Red Flags

These are not skill gaps. These are cultural and personality mismatches specific to Christiaan:

| Red flag | Present? | Severity | Context |
|----------|----------|----------|---------|
| Role is primarily maintenance/ops | [yes/no] | High if yes | Builder depletes fast in pure ops |
| Solo sales of an unready product | [yes/no] | High if yes | Demonstrated failure mode — see known gaps |
| Full-time exclusivity expected | [yes/no] | Medium | Conflicts with fractional model |
| Large corporate, slow decision cycles | [yes/no] | Medium | Low individual visibility, frustrating pace |
| Governance/board role in declining org | [yes/no] | High if yes | Watches what needs changing, can't act |
| Ceremony-only Scrum Master | [yes/no] | Medium-High | No building mandate = engagement risk |

If none apply: state "No personality-specific red flags detected."

### H7 — Fit Verdict

**The honest case for this match:**
Why this role/org would bring out Christiaan's best work — not just the skills match, but the environment, the mandate, the mission. What specifically about this context plays to his strengths as a person.

**The honest case against (or "watch for"):**
What the real risks are — personality and culture risks, not skill gaps. What would need to be true for this to work long-term. If there are genuine concerns, say them plainly.

**Overall personality/culture fit:** Strong / Moderate / Conditional (state the condition) / Poor

This verdict feeds into the overall score — a role with strong skill match but poor personality fit should not score above 3.5.

---

## Post-evaluation

**ALWAYS** after generating blocks A-H:

### 1. Create application folder

Create the folder: `applications/{###}-{company-slug}/`

- `{###}` = next sequential number (3 digits, zero-padded). Count files in `reports/` to get max, add 1.
- `{company-slug}` = company name lowercase with hyphens, no date

This folder will hold everything for this application: JD, report, cover letter, CV. When you get invited to interview weeks later, everything is in one place even if the posting was removed.

### 2. Save raw JD text

Save verbatim job description text (no evaluation, just the JD) to:
`applications/{###}-{company-slug}/jd.md`

Header:
```markdown
# Job Description — {Company} | {Role}
*Archived {YYYY-MM-DD} — {URL}*

---

{full JD text verbatim}
```

### 3. Save evaluation report

Save full evaluation (blocks A-G) to:
`applications/{###}-{company-slug}/report.md`

Also save a copy to `reports/{###}-{company-slug}-{YYYY-MM-DD}.md` for backward compatibility with the tracker and merge scripts.

Then generate a PDF of the report:
`node generate-pdf.mjs applications/{###}-{company-slug}/report.md applications/{###}-{company-slug}/report.pdf`

- `{###}` = same number as the application folder

**Report format:**

```markdown
# Evaluation: {Company} — {Role}

**Date:** {YYYY-MM-DD}
**URL:**
**Archetype:** {detected}
**Score:** {X/5}
**Legitimacy:** {High Confidence | Proceed with Caution | Suspicious}
**PDF:** {path or pending}

---

## A) Role Summary
(full content of block A)

## B) Match with CV
(full content of block B)

## C) Level and Strategy
(full content of block C)

## D) Comp and Demand
(full content of block D)

## E) Customization Plan
(full content of block E)

## F) Interview Plan
(full content of block F)

## G) Posting Legitimacy
(full content of block G)

## H) Culture, Personality & Long-term Fit
(full content of block H — org culture, personality fit table, values alignment, energy analysis, 18-month test, red flags, fit verdict)

## I) Draft Application Answers
(only if score >= 4.5 — draft answers for the application form)

---

## Keywords extracted
(list of 15-20 keywords from the JD for ATS optimization)
```

### 4. Generate cover letter (if score >= 3.0)

Run cover-letter mode and save to:
- `applications/{###}-{company-slug}/cover-letter.md`
- `applications/{###}-{company-slug}/cover-letter.html`
- `applications/{###}-{company-slug}/cover-letter.pdf`

PDF command: `node generate-pdf.mjs applications/{###}-{company-slug}/cover-letter.html applications/{###}-{company-slug}/cover-letter.pdf`

### 5. Generate tailored CV PDF (if score >= 3.0)

Generate the tailored CV HTML and save to:
- `applications/{###}-{company-slug}/cv.html`
- `applications/{###}-{company-slug}/cv.pdf`

PDF command: `node generate-pdf.mjs applications/{###}-{company-slug}/cv.html applications/{###}-{company-slug}/cv.pdf`

### 6. Record in tracker

Write TSV to `batch/tracker-additions/{###}-{company-slug}.tsv`
Link in tracker → `applications/{###}-{company-slug}/report.md`

**NEVER** add rows directly to `data/applications.md` — use TSV + `node merge-tracker.mjs`.

**Tracker format:**

```markdown
| # | Date | Company | Role | Score | Status | PDF | Report |
```
