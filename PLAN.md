# Enhancement Plan — Career Developer + Cover Letter Pipeline

## Context

Fork of `santifer-io/career-ops`. These enhancements are local additions.
Rules:
- `AGENTS.md` is upstream system-layer — minimal touches, prefer `CLAUDE.md` for Claude Code-specific additions
- User-layer files (`cv.md`, `config/profile.yml`, `career-story.md`) are never auto-updated by system
- ADD ONLY rule applies to `cv.md` — never remove content

---

## Feature 1: Career Developer Mode

### Problem

Current onboarding (AGENTS.md Steps 1-6) is a file setup wizard only. It configures the tool but does not deeply understand the person. Every downstream output — CV summaries, cover letter voice, evaluation framing, STAR stories — is limited by the shallowness of what the profile files contain. The richer the input, the better every output.

### Goal

A deep, optional, re-runnable career discovery session. Conversational — not a form dump. The agent asks structured questions, builds a `career-story.md` file, and writes back key extracts to `cv.md` and `config/profile.yml` with user confirmation before any writes.

---

### Files to Create / Modify

| Action | File | Layer |
|--------|------|-------|
| CREATE | `modes/career-developer.md` | System (auto-updatable) |
| CREATE | `career-story.md` (on first run) | **User-layer — never auto-updated** |
| MODIFY | `CLAUDE.md` | Claude Code-specific |
| MODIFY | `modes/_shared.md` | System |
| MODIFY | `AGENTS.md` | System (one line only) |

---

### `career-story.md` — File Structure

Created on first run. User owns it. The mode never overwrites sections without confirmation.

```markdown
# Career Story — {name}
<!-- This file is yours. It was built through a conversation with the career-developer mode.
     Run `/career-ops career-developer` any time to update a section. -->

## Identity
<!-- The thread that connects everything. Who you are beyond job titles. -->

## Values
<!-- What makes work meaningful. What you optimize for. -->

## Anti-motivations
<!-- What drains you. What you would never do again. -->

## Superpowers
<!-- What you do that most people in your field cannot. -->

## Growth Edges
<!-- Skills you are actively building. Where you want to go deeper. -->

## Hard Nos
<!-- Skills, environments, cultures to avoid permanently. Non-negotiables. -->

## Best Work Stories
<!-- 3-5 moments when you were at your absolute best. Named, dated, outcomes included. -->

## Ideal Environment
<!-- Team size, structure, pace, autonomy, remote/hybrid, sector, org type. -->

## Career Arc
<!-- Where you have been, what the through-line is, where you are going, what the bridge is. -->

## The Pitch
<!-- 60-second cold introduction. What you say at a dinner next to a potential partner. -->
```

---

### `modes/career-developer.md` — Mode Specification

#### Invocation
- `/career-ops career-developer`
- Suggested by Claude Code after onboarding completes (via `CLAUDE.md`)
- Can be re-run any time — update one section or all

#### Step 0 — Check existing file

```
Does career-story.md exist?

YES:
  Show summary of populated sections.
  Ask: "Want to do a full refresh, or update a specific section?"
  - Full refresh → proceed through all sections
  - Update section → jump to that section only, keep others intact

NO:
  Brief intro:
  "I'm going to ask you questions across 10 areas of your career and life.
   There are no wrong answers. The goal is to make the system understand
   you well enough to generate accurate CVs, honest cover letters, and
   better-targeted evaluations. You can skip any section and come back later.
   Ready?"
```

#### Step 1-10 — Discovery Questions (conversational, not a form)

Run one section at a time. Wait for answer. Ask one clarifying follow-up if the answer is thin. Move on.

**Section 1: Identity**
- "Beyond your job title — what is the thread that connects everything you have done? What are you really about?"
- Follow-up if thin: "If a recruiter who met you 10 years ago described you to a recruiter meeting you today, what would they say hasn't changed?"

**Section 2: Values**
- "What makes work feel meaningful to you — not in a generic sense, but specifically?"
- "When were you last genuinely energized by work? What was happening?"
- Follow-up: "What do you optimize for when choosing what to work on? Impact, craft, autonomy, learning, income, relationships?"

**Section 3: Anti-motivations**
- "What drains you completely — not just hard work, but the wrong kind of work?"
- "Name something you would not do again even for significantly more money."
- "Describe a role or project that felt wrong from the inside. What made it wrong?"

**Section 4: Superpowers**
- "What do you do that most people in your field genuinely cannot?"
- "What have colleagues said you are surprisingly good at — things others struggle with?"
- "Where do you consistently produce outsized results relative to the effort you put in?"

**Section 5: Growth Edges**
- "What skills are you actively building right now?"
- "What would make you materially better as a professional in two years?"
- "Where do you feel the pull to go deeper — what excites you when you learn about it?"

**Section 6: Hard Nos**
- "Are there skills you want to stop using entirely? Things you are good at but do not want to be hired for?"
- "What types of environments kill your energy? (micromanagement, no autonomy, pure execution, politics, etc.)"
- "What would make you quit a role within a month?"

**Section 7: Best Work Stories**
- "Tell me about 3 to 5 moments when you were at your absolute best professionally."
- For each story: "What was the situation? What did you do specifically? What was the outcome? Why does it still matter to you?"
- Note: these become STAR story seeds for `interview-prep/story-bank.md`

**Section 8: Ideal Environment**
- "Describe your ideal working context in concrete terms."
- Prompts if needed: team size, flat vs. hierarchical, pace, autonomy level, remote/hybrid, sector, org type (startup/corporate/research/NGO), client-facing or internal.
- "What does your best Monday look like?"

**Section 9: Career Arc**
- "Walk me through your career in 5 sentences. Not the CV version — your version."
- "What is the through-line — the thing that has always been there even across different roles and orgs?"
- "Where are you going? Not the job title — the work you want to be doing."
- "What is the bridge from where you are now to where you want to be?"

**Section 10: The Pitch**
- "If you had 60 seconds to introduce yourself at a dinner next to a potential client or collaborator — not a job interview, just a genuine introduction — what would you say?"
- Follow-up: "Say it without using your job title in the first sentence."

---

#### Step 11 — Build and Confirm

```
1. Assemble full career-story.md draft from all answers
2. Show it to the user:
   "Here is your career story. Read it as if you are reading about someone else.
    Does it feel accurate? Is anything missing or wrong?"
3. Allow edits before writing
4. Write career-story.md
```

#### Step 12 — Writeback to profile.yml and cv.md

Show proposed changes before writing anything.

**profile.yml fields to update:**

| Field | Source in career-story.md | Action |
|-------|--------------------------|--------|
| `narrative.headline` | The Pitch section | Rewrite (confirm first) |
| `narrative.exit_story` | Career Arc + Identity | Rewrite (confirm first) |
| `narrative.superpowers` | Superpowers section | Replace list (confirm first) |
| `narrative.anti_motivations` | Anti-motivations | ADD new field (does not exist yet) |
| `narrative.ideal_environment` | Ideal Environment | ADD new field |
| `narrative.growth_edges` | Growth Edges | ADD new field |
| `narrative.hard_nos` | Hard Nos | ADD new field |

New fields go under the `narrative:` block in `profile.yml`.

**cv.md — Professional Summary enrichment:**

Rule: ADD ONLY. Never remove existing sentences.

From career-story.md, extract any concrete facts, proof points, or framings not yet in the summary. Propose an enriched summary. User confirms before write.

Typical additions:
- A sentence from "The Pitch" if it's stronger than current headline
- A working-style note if missing ("Strongest in 0-to-1 and 1-to-2 stages")
- A hard nos signal if useful for targeting ("Not available for pure execution roles")

**story-bank.md update:**

For each Best Work Story that is not already in `interview-prep/story-bank.md`, propose adding it as a STAR seed entry. User confirms.

---

#### Step 13 — Completion

```
Confirm what was written:
- career-story.md: created / updated
- profile.yml: X fields updated
- cv.md: summary enriched (or no changes needed)
- story-bank.md: X stories added (or skipped)

Suggest next: "Now that the system knows you better, your next CV and cover letter
will be significantly more accurate. Want to run an evaluation on a job to test it?"
```

---

### CLAUDE.md Addition

After onboarding completes (all required files present), add this suggestion:

```markdown
## Career Developer (Claude Code Enhancement)

After onboarding completes and all files are present, suggest once:
> "System is configured. For significantly better CV and cover letter quality,
> run `/career-ops career-developer` — a one-time (or any-time) deep session
> to help the system understand you beyond your CV. Takes 20-30 minutes.
> Fully optional, and you can do it section by section."

Only suggest once per session. Do not repeat if user declines.
```

---

### _shared.md Addition

Add `career-story.md` to Sources of Truth table:

```markdown
| career-story.md | `career-story.md` (if exists) | When generating cover letters, CV summaries, or STAR stories — richer than profile.yml |
```

---

### AGENTS.md Addition (minimal)

Add one row to Skill Modes table only:

```markdown
| Wants deep career discovery / profile enrichment | `career-developer` |
```

---

---

## Feature 2: Cover Letter in Apply Flow

### Problem

`modes/cover-letter.md` is well-built but disconnected from the apply flow. When a user opens `apply` mode to fill a form, they also need a cover letter — but currently have to remember to invoke it separately. It should be automatic: if you are applying, you get a cover letter.

### Goal

`apply` mode auto-checks for an existing cover letter and generates one if absent. Full org research preserved. Output goes to both locations. Nothing about the existing cover-letter mode changes structurally.

---

### Files to Modify

| Action | File |
|--------|------|
| MODIFY | `modes/apply.md` |
| MODIFY | `modes/cover-letter.md` — line 3 only (hardcoded name fix) |

---

### Trigger

NOT in auto-pipeline (auto-pipeline runs on every eval, cover letters are for apply decisions).

Trigger: user invokes `apply` mode for a specific job.

---

### Updated apply.md Flow

Current flow:
```
1. DETECT      → Read active Chrome tab
2. IDENTIFY    → Extract company + role
3. SEARCH      → Match against existing reports
4. LOAD        → Read full report + Section G
5. COMPARE     → Role changed?
6. ANALYZE     → Form questions
7. GENERATE    → Responses
8. PRESENT     → Show output
```

New flow — insert Step 4.5 after LOAD, before COMPARE:

```
1. DETECT      → Read active Chrome tab
2. IDENTIFY    → Extract company + role
3. SEARCH      → Match against existing reports
4. LOAD        → Read full report + Section G
[4.5] COVER LETTER CHECK  ← NEW
5. COMPARE     → Role changed?
6. ANALYZE     → Form questions
7. GENERATE    → Responses
8. PRESENT     → Show cover letter + form answers
```

---

### Step 4.5 — Cover Letter Check (detailed)

```
1. Determine application slug from report filename match
   e.g. report = "002-red-panda-works-2026-05-21.md" → slug = "red-panda-works", num = "002"

2. Check: does applications/002-red-panda-works/cover-letter.md exist?

   CASE A — exists:
     Load it.
     Store as [existing_cover_letter].
     Note: "Cover letter found (existing). Will be included in output."

   CASE B — does not exist:
     Announce: "[1/2] Generating cover letter for {Company} — {Role}..."

     Invoke cover-letter mode (modes/cover-letter.md) fully:
       - Steps 1-7 of cover-letter.md
       - Full org research (WebSearch) — do not skip
       - Generate letter content

     Ensure application folder exists:
       If applications/002-red-panda-works/ does not exist → create it

     Write to:
       (a) applications/002-red-panda-works/cover-letter.md
       (b) output/motivatiebrief-red-panda-works-{YYYY-MM-DD}.md

     Store as [generated_cover_letter].
     Announce: "[2/2] Cover letter ready. Continuing with form responses..."

   CASE C — no report match at all (no num/slug):
     Skip cover letter step.
     Note in output: "No report found for this job — cover letter skipped.
     Run auto-pipeline first or use /career-ops cover-letter manually."

3. Continue to COMPARE (Step 5).
```

---

### Step 8 — PRESENT (updated output format)

Current output format:
```
## Responses for {Company} — {Role}
Based on: Report #NNN | Score: X.X/5 | Archetype: [type]
---
### 1. [Question]
> [Response]
...
```

New output format:
```
## Application Package — {Company} — {Role}
Based on: Report #{###} | Score: {score} | Archetype: {type}

---

### Cover Letter
[Full cover letter content]

---

### Form Responses

#### 1. [Exact form question]
> [Response]

#### 2. [Next question]
> [Response]
...

---
Notes:
- [observations]
```

---

### cover-letter.md Fix — Line 3

Current line 3:
```
Generate a motivation letter that sounds like Christiaan wrote it: direct, curious, connects unexpected dots, warm without being soft.
```

Replace with:
```
Generate a motivation letter that sounds like {candidate.full_name from config/profile.yml} wrote it: direct, curious, connects unexpected dots, warm without being soft. Voice calibrated from modes/_profile.md (writing style section) and career-story.md (if it exists).
```

Also: if `career-story.md` exists, add it as Step 1 source after `cv.md`:
```
1. cv.md — proof points, timelines, project names
1b. career-story.md (if exists) — superpowers, pitch, best work stories, voice
2. modes/_profile.md — archetypes, exit narrative, writing style, comp targets
...
```

---

## Implementation Order

Low-risk fixes first, new features after:

1. **Fix cover-letter.md line 3** (5 min — low risk, no logic change)
2. **Modify apply.md** — insert Step 4.5 and update PRESENT format (45 min)
3. **Create modes/career-developer.md** — full mode definition (2-3 hours)
4. **Add career-story.md to _shared.md** sources table (5 min)
5. **Add career-developer row to AGENTS.md** skill modes table (5 min)
6. **Add career-developer suggestion to CLAUDE.md** (10 min)

Total estimated effort: one focused session.

---

## Non-Goals

- No changes to auto-pipeline scoring or evaluation logic
- No changes to CV template HTML/LaTeX
- No changes to upstream AGENTS.md onboarding Steps 1-6
- Career developer does NOT block job evaluation — always optional
- Cover letter is NOT generated on every eval — only on apply
- No batch cover letter generation (quality over quantity)
