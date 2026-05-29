# Mode: cover-letter — Human-Voice Motivation Letter

Generate a motivation letter that sounds like {candidate.full_name from config/profile.yml} wrote it: direct, curious, connects unexpected dots, warm without being soft. Not a formal begeleidende brief. Not a CV rehash. A letter a real person wrote. Voice calibrated from modes/_profile.md (writing style section) and career-story.md (if it exists).

---

## Hard Rules (non-negotiable)

1. **NO em-dashes. Ever.** Use commas, colons, or new sentences instead.
1a. **NO spaced-hyphen separators.** Do not replace em-dashes with ` - `. That pattern reads as AI-generated. Restructure the sentence: use a colon, a subordinate clause ("waarbij", "waarmee", "zodat", "omdat"), or split into two sentences.
2. Never open with "I am writing to apply" / "Hierbij solliciteer ik" / "Met grote interesse" / "Naar aanleiding van".
3. Never close with "Ik zie uit naar uw reactie" / "I look forward to hearing from you" / "Hopend u hiermee voldoende te hebben geïnformeerd."
4. No clichés: "passionate about", "results-oriented", "proven track record", "leveraged", "spearheaded", "synergies", "seamless", "innovative".
5. Max 4 paragraphs. Max ~300 words. One A4 page, always.
6. Every proof point must come from cv.md or the evaluation report. Never invent.
7. Language: Dutch if NL company / Dutch JD. English otherwise. (Same policy as pdf mode.)

---

## Workflow

### Step 1 — Load context

Read in order:
1. `cv.md` — proof points, timelines, project names
1b. `career-story.md` (if exists) — superpowers, the pitch, best work stories, voice calibration
2. `modes/_profile.md` — archetypes, exit narrative, writing style, comp targets
3. `article-digest.md` (if exists) — richer metrics and story beats
4. `reports/` — grep for the company name. If report exists, read it fully.
   - Pull: archetype match, proof points called out in Block B/F, interviewer name if listed, score, any red flags

If no report exists for this company, ask: "Should I run a quick evaluation first, or write the letter from cv.md only?"

### Step 2 — Research the org

Use WebSearch to find:
- What kind of org is it: startup / scaleup / corporate / public utility / government / academic / agency
- Their tone: job postings, About page, LinkedIn presence, press releases, product pages
- Something specific and recent: a product launch, a challenge they face publicly, a mission phrase they use repeatedly, a news item
- Who is likely reading this: recruiter? hiring manager? founder? team lead?

Use what you find to calibrate the tone dial:

| Org type | Tone dial |
|----------|-----------|
| Startup / AI-first | Full ENFP energy. Concrete, fast, show you get what they're building. |
| Scaleup / product company | Direct, confident, collegial. Show you've done the actual work, not just managed it. |
| Corporate consulting | Structured opener, then real voice. Show business-IT-management bridge. |
| Public utility / data infra | Quiet confidence. Technically grounded. No hype. Reliability and structure are the signals they want. |
| Government / compliance-heavy | Neutral professional. Specific to their mandate. Skip startup jargon entirely. |
| Academic / research | Narrative-rich. Collegial. Show intellectual curiosity alongside a practical track record. |
| Agency / creative services | More energy, concrete delivery stories, show you can move fast and handle ambiguity. |

### Step 3 — Build the opening paragraph

Never start with a self-introduction. Pick one of these three openers depending on what fits the org:

**A. Lead with what you noticed about the org:**
Demonstrate you actually read about them. Reference their domain, their challenge, or something specific they do. Then pivot to why your combination is relevant.
> "EDSN beheert kritische data-infrastructuur voor de Nederlandse energiemarkt. Dat vraagt om teams die autonoom kunnen werken binnen strakke kaders."

**B. Lead with your unusual combination:**
Name the thing that makes you different for this role specifically. The combination that is rare, not just each skill individually.
> "Ik combineer wat weinig Scrum Masters hebben: 15+ jaar agile-praktijk én 10+ jaar DevOps-ervaring."

**C. Lead with a concrete story beat:**
One specific thing you did that mirrors what they need. Don't explain it yet. Just state it, then let the rest of the letter carry the weight.
> "Bij Aeres voegde ik acht afzonderlijke vakken samen tot één sprintcyclus. In minder dan twee maanden, schoolbreed."

The opener must make the reader think: "Oh, this is different from the last twelve letters."

### Step 4 — Build the body (2 paragraphs)

**Paragraph 2 — Your clearest proof point for this role:**
- One specific thing you did that directly maps to what they need
- Named, dated, numbered where possible
- Show the outcome, not just the activity
- Draw the connection explicitly: "Dat is exact wat [org] vraagt" or "That is the same challenge [org] is solving."

**Paragraph 3 — Why this org specifically:**
- Use what you found in the research
- Reference something real: their product, their mission language, their domain complexity, their stage
- Show you thought about their context, not just your own CV
- Connect it back to your working model: you thrive in environments that need building, not just maintaining

ENFP-T voice to maintain throughout:
- Connects dots others miss ("De combinatie van X en Y is precies wat dit vraagt")
- Genuine curiosity about what the org is trying to do, not just what you bring
- Short sentences. Then one longer one that explains the connection. Short again.
- First person active: "I built", "ik deed", "we ran". No passive voice.
- Warmth comes from word choice and specificity, not from filler phrases

### Step 5 — Close with forward momentum

One or two sentences. Concrete. Not desperate. Not formulaic.

Good examples:
- "Amersfoort is goed bereikbaar vanuit Baarn. Ik bespreek graag de mogelijkheden."
- "Bijgevoegd vind je mijn 90-dagenplan." (only if the plan actually exists as a PDF in the application folder)
- "Ik ben beschikbaar voor een gesprek op kort termijn."
- "I'd be happy to walk through the first 90 days in a conversation."

**CRITICAL:** If the close references an attachment, proposal, or plan, that document must already exist and be ready to send. Never promise something that has not been created yet.

Bad examples (never use):
- "Ik zie uit naar uw reactie."
- "Met de hoop spoedig van u te horen."
- "I look forward to hearing from you."
- "Please do not hesitate to contact me."

### Step 6 — Sign-off

Always:
```
Met vriendelijke groet,        (or "Kind regards," for English)
{name from profile.yml}
{phone from profile.yml}
{email from profile.yml}
{linkedin from profile.yml}
```

If there is a relevant live URL in the proof points that adds credibility for this specific role, add it after LinkedIn. Max one URL.

### Step 7 — Output

**If an application folder exists** (`applications/{###}-{company-slug}/`):
Write to: `applications/{###}-{company-slug}/cover-letter.md`
Also generate HTML: `applications/{###}-{company-slug}/cover-letter.html`
Generate PDF: `node generate-pdf.mjs applications/{###}-{company-slug}/cover-letter.html applications/{###}-{company-slug}/cover-letter.pdf`

**If no application folder exists** (standalone cover letter request):
Write to: `output/motivatiebrief-{company-slug}-{YYYY-MM-DD}.md`

Format:
```markdown
# Motivatiebrief — {Company}
**Functie:** {Role title}
**Datum:** {date in Dutch format: DD maand YYYY}

---

{opening paragraph}

{proof point paragraph}

{why this org paragraph}

{closing sentence(s)}

Met vriendelijke groet,
{name}
{phone}
{email}
{linkedin}
```

After writing the `.md`, ask:
> "Wil je ook een PDF-versie met hetzelfde ontwerp als het CV?"

If yes: generate HTML using `cv-template.html` as base but letter layout (no competency grid, no experience list, just the letter body), then run `node generate-pdf.mjs`.

---

## ENFP-T Voice Reference

Christiaan is ENFP-T. In professional writing this translates to:

**What stays constant:**
- Energy comes from genuine connection, not performance. He's excited because he sees the fit, not to impress.
- Direct. Says what he means. Skips preamble.
- Story instinct: anchors ideas in a concrete moment or example before explaining the concept.
- Bridging: naturally connects business, IT, and people dimensions in one thought.
- Forward-looking: more interested in what's possible than in cataloguing what has been.

**What adjusts by org type:**
- Energy level: high for startups and AI-first roles; medium-confident for public utilities and corporate
- Story vs. proof ratio: more stories for creative/agency roles; more named proof points for compliance-heavy or corporate
- Jargon: match the org's own vocabulary; never over-jargon, never under-credential

**What never changes:**
- No em-dashes
- No ` - ` spaced-hyphen separators — these are the most visible AI writing tell. Use real sentence structure.
- No corporate-speak
- No sycophancy
- No "I look forward to"
- It sounds like a person wrote it, not a template

**AI-detectable patterns to actively avoid:**
- Parallel list constructions ("I did X. I did Y. I did Z.") — vary rhythm and structure
- Every sentence starting with "Ik" / "I"
- Formulaic "X, resulting in Y" or "Leveraged X to achieve Y"
- Bullet-point energy in prose (short declarative sentences with no connective tissue)
- Over-specificity for its own sake ("15+ years", "4 delivery teams") without narrative purpose

---

## Post-generation

If this company has an existing tracker entry, leave the status as-is (status changes only when the user confirms submission via `apply` mode).

Suggest: "Als je klaar bent om te versturen, gebruik dan `/career-ops apply` om het formulier in te vullen en de status bij te werken."
