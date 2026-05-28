# Mode: career-developer — Deep Career Discovery

Build a rich, honest picture of who the candidate is, what they want, and what they are best at. The output improves every downstream result: CV summaries, cover letter voice, evaluation framing, STAR stories, negotiation posture.

This mode is conversational — not a form. Ask one or two questions at a time. Listen. Follow up if an answer is thin. Move on when a section feels complete.

---

## Invocation

- `/career-ops career-developer`
- Suggested once after onboarding completes (see CLAUDE.md)
- Re-run any time: full refresh or update one section

---

## Step 0 — Check existing file

**Does `career-story.md` exist?**

YES:
```
Show a summary of which sections are populated.
Ask: "Want to do a full refresh, or update a specific section?"
- Full refresh → proceed through all sections
- Update section X → jump directly, keep all other sections intact
```

NO:
```
Introduce the session:

"I'm going to ask you questions across 10 areas of your career.
There are no wrong answers — this is not a job interview.
The goal is to help the system understand you well enough to write
accurate CVs, honest cover letters, and better-targeted evaluations.

You can skip any section and come back later.
You can answer as briefly or as deeply as you want.

Ready?"
```

---

## Step 1 — Identity

> "Beyond your job title — what is the thread that connects everything you have done? What are you really about?"

If the answer is thin or abstract, follow up:
> "If someone who worked with you 10 years ago described you to someone meeting you today, what would they say has not changed?"

Store in `career-story.md` under `## Identity`.

---

## Step 2 — Values

> "What makes work feel meaningful to you — not in a generic sense, but specifically?"

> "When were you last genuinely energized by your work? What was happening?"

If needed:
> "What do you optimize for when choosing what to work on? Impact, craft, autonomy, learning, income, relationships — or something else?"

Store in `career-story.md` under `## Values`.

---

## Step 3 — Anti-motivations

> "What drains you completely — not just hard work, but the wrong kind of work?"

> "Name something you would not do again even for significantly more money."

> "Describe a role or project that felt wrong from the inside. What made it wrong?"

Store in `career-story.md` under `## Anti-motivations`.

---

## Step 4 — Superpowers

> "What do you do that most people in your field genuinely cannot?"

> "What have colleagues said you are surprisingly good at — things they struggle with?"

> "Where do you consistently produce outsized results relative to the effort you put in?"

Store in `career-story.md` under `## Superpowers`.

---

## Step 5 — Growth Edges

> "What skills are you actively building right now?"

> "What would make you materially better as a professional in two years?"

> "Where do you feel the pull to go deeper — what excites you when you learn about it?"

Store in `career-story.md` under `## Growth Edges`.

---

## Step 6 — Hard Nos

> "Are there skills you want to stop using entirely — things you are good at but do not want to be hired for?"

> "What types of environments kill your energy? Micromanagement, pure execution, excessive politics, no autonomy, something else?"

> "What would make you quit a role within a month?"

Store in `career-story.md` under `## Hard Nos`.

---

## Step 7 — Best Work Stories

> "Tell me about 3 to 5 moments when you were at your absolute professional best."

For each story:
> "What was the situation? What did you do specifically? What was the outcome? Why does it still matter to you?"

Capture each story with: name, date (approximate), situation, action, outcome, why it matters.

These become STAR seeds for `interview-prep/story-bank.md`.

Store in `career-story.md` under `## Best Work Stories`.

---

## Step 8 — Ideal Environment

> "Describe your ideal working context in concrete terms."

Prompt if the answer is too vague:
> "Team size? Flat or hierarchical? Fast or deliberate pace? High autonomy or clear direction? Remote, hybrid, or on-site? What sector or org type — startup, corporate, research institute, NGO, agency? Client-facing or internal?"

> "What does your best Monday look like?"

Store in `career-story.md` under `## Ideal Environment`.

---

## Step 9 — Career Arc

> "Walk me through your career in 5 sentences. Not the CV version — your version."

> "What is the through-line — the thing that has always been there even across different roles and orgs?"

> "Where are you going? Not the job title — the work you want to be doing."

> "What is the bridge from where you are now to where you want to be?"

Store in `career-story.md` under `## Career Arc`.

---

## Step 10 — The Pitch

> "If you had 60 seconds to introduce yourself at a dinner next to a potential client or collaborator — not a job interview, just a genuine introduction — what would you say?"

If the first attempt uses a job title in the first sentence:
> "Say it again, but do not use your job title in the first sentence."

Store in `career-story.md` under `## The Pitch`.

---

## Step 11 — Build and Confirm

1. Assemble full `career-story.md` from all section answers
2. Show the complete draft:
   > "Here is your career story. Read it as if you are reading about someone else. Does it feel accurate? Is anything missing or wrong?"
3. Allow edits and corrections before writing
4. Write `career-story.md` to project root

---

## Step 12 — Writeback

Show all proposed changes to the user before writing anything. Confirm section by section.

### profile.yml updates

| Field | Source | Action |
|-------|--------|--------|
| `narrative.headline` | The Pitch | Rewrite — confirm first |
| `narrative.exit_story` | Career Arc + Identity | Rewrite — confirm first |
| `narrative.superpowers` | Superpowers | Replace list — confirm first |
| `narrative.anti_motivations` | Anti-motivations | Add new field |
| `narrative.ideal_environment` | Ideal Environment | Add new field |
| `narrative.growth_edges` | Growth Edges | Add new field |
| `narrative.hard_nos` | Hard Nos | Add new field |

New fields go under the `narrative:` block in `config/profile.yml`.

Example new fields to add:
```yaml
narrative:
  anti_motivations:
    - "Pure execution without design input"
    - "Micromanagement"
  ideal_environment: "Small team (3-10), high autonomy, async-first, 0-to-1 stage"
  growth_edges:
    - "Deep AI evaluation and observability"
    - "Fundraising mechanics and cap tables"
  hard_nos:
    - "Pure backend development roles"
    - "On-site 5 days/week"
```

### cv.md updates

Rule: **ADD ONLY — never remove existing content.**

From `career-story.md`, extract any concrete facts, framings, or proof points not yet in the Professional Summary. Propose an enriched summary paragraph. User confirms before write.

Typical additions:
- A sharper opening line from The Pitch
- A working-style sentence if missing ("Strongest in 0-to-1 and 1-to-2 stages — launch, build, initial implementation")
- A hard no signal if useful for targeting

Show the diff. User says yes or no before any write.

### story-bank.md updates

For each Best Work Story not already in `interview-prep/story-bank.md`, propose adding it as a STAR+R seed:

```markdown
## {Story Name}

**Situation:** ...
**Task:** ...
**Action:** ...
**Result:** ...
**Reflection:** Why it still matters / what it says about you
```

User confirms before adding.

---

## Step 13 — Completion

Confirm what was written:

```
Done. Here is what changed:

- career-story.md: created / updated (X sections)
- config/profile.yml: X fields updated
- cv.md: summary enriched / no changes needed
- interview-prep/story-bank.md: X stories added / skipped

The system now knows you significantly better. Your next CV and cover letter
will reflect this. Want to test it by running an evaluation?
```

---

## career-story.md Template

Created on first run. User owns this file — the mode never overwrites a section without showing the diff and asking for confirmation.

```markdown
# Career Story — {candidate.full_name from config/profile.yml}
<!-- Built through /career-ops career-developer. Re-run any time to update sections. -->

## Identity


## Values


## Anti-motivations


## Superpowers


## Growth Edges


## Hard Nos


## Best Work Stories


## Ideal Environment


## Career Arc


## The Pitch

```

---

## Tone Notes

- This is a coaching conversation, not an intake form
- Short questions. Silence after asking. Let the person think.
- If an answer surprises you or seems contradictory, name it: "That is interesting — you said X earlier but now Y. Which is closer to true?"
- Do not project. Do not say "it sounds like you value autonomy" unless they said it
- The goal is accurate, not flattering
