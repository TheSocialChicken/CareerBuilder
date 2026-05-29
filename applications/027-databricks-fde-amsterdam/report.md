# [Report 027] Databricks — AI Engineer - FDE (Forward Deployed Engineer) - Amsterdam

**Score:** 2.5/5
**Culture Fit:** Conditional
**URL:** https://databricks.com/company/careers/open-positions/job?gh_jid=8560401002
**PDF:** ❌
**Legitimacy:** High Confidence
**Verification:** confirmed (WebFetch)
**Date:** 2026-05-21

---

## A) Role Summary

| Field | Detail |
|-------|--------|
| Archetype | AI Forward Deployed Engineer |
| Domain | Enterprise data & AI platform (GenAI, LLMOps, Databricks Intelligence Platform) |
| Function | Deploy + consult + build — customer-facing technical delivery of GenAI solutions |
| Seniority | All levels (Junior to Senior; JD title says "ALL LEVELS") |
| Remote | Remote Netherlands (preferred Amsterdam; also London, Madrid, Paris) |
| Team size | Not specified; part of the AI FDE EMEA team, reports to Senior Manager AI FDE EMEA |
| TL;DR | Client-facing GenAI engineer who builds and deploys production AI applications for Databricks enterprise customers — heavy data science / ML engineering requirements, advisory + delivery combined. |

---

## B) Match with CV

### Requirements vs CV mapping

| JD Requirement | CV Match | Strength |
|----------------|----------|----------|
| Building GenAI applications (RAG, multi-agent, Text2SQL, fine-tuning) | Self-hosted AI stack: Flowise, OpenWebUI, n8n, Supabase on Linux infrastructure. VCH AI compliance tools. | Partial — runs and integrates AI tools, but has not built production RAG or multi-agent systems from scratch using ML libraries |
| Deploying production-grade GenAI applications with evals | Self-hosted stack is in active use by students and researchers. No formal eval frameworks. | Partial — operational deployment yes, but not enterprise-grade with MLOps tooling |
| Extensive hands-on data science experience (pandas, scikit-learn, PyTorch) | Data Analysis & Visualization cert (R, Python). Dashboarding & Analysis course at InHolland. Oracle 11g BI deployments at KONGSBERG. | Weak — data literacy confirmed, but no evidence of pandas/scikit-learn/PyTorch at production level |
| Production ML deployments on AWS/Azure/GCP | Docker, Kubernetes, GitHub CI/CD, Linux self-hosted. No public cloud ML platform experience. | Weak — strong DevOps on-prem, but cloud ML platforms (SageMaker, AzureML, Vertex) not in CV |
| Databricks Intelligence Platform / Apache Spark experience | Not in CV | Gap |
| Quantitative degree or equivalent experience | Bachelor Business IT & Management (HvA, grade 8.7). Technical Informatics (HvA). | Partial — business informatics, not quantitative/STEM. Equivalent clause may cover it |
| Technical communication to diverse audiences | Expert: workshop design, train-the-trainer, KONGSBERG client training (BP, Statoil), university lecturing | Strong — this is a genuine superpower |
| Willingness to travel quarterly for customer visits | Remote-first EU is preferred. Quarterly travel is acceptable given fractional model. | Acceptable |
| Trusted technical advisor to customers | KONGSBERG: full BI implementations for BP (Jordan, Oman), Statoil. Client-facing technical delivery. | Moderate — real enterprise client delivery, but in 2012; different tech era |

### Gaps

| Gap | Blocker? | Mitigation |
|-----|----------|------------|
| No production ML / data science engineering (pandas, scikit-learn, PyTorch) | Hard blocker — this is listed as a core requirement for an "engineer" role | Would need 6-12 months of dedicated ML engineering work to close |
| No cloud ML platform experience (AWS SageMaker, Azure ML, GCP Vertex) | Hard blocker for enterprise AI deployment at Databricks customer level | Adjacent DevOps skills help but don't substitute |
| No Databricks/Spark/Delta Lake experience | Soft blocker (preferred, not required) but very expected given the company | Databricks has learning resources; 2-4 months to get functional |
| No formal eval frameworks or LLMOps tooling | Hard blocker — evals are explicitly required ("deploying production-grade GenAI applications with evaluation capabilities") | Ragas, DeepEval, PromptFlow are learnable; no production examples to show |
| No RAG/multi-agent system architecture from scratch | Hard blocker for credibility with enterprise customers at Databricks level | n8n workflows and Flowise are relevant but not at the same engineering depth |

**Summary:** Christiaan is a practitioner and integrator of AI tools — he runs complex AI stacks for real users. But this role requires someone who builds the underlying ML systems, not someone who deploys and connects them. The "AI Forward Deployed" archetype in _profile.md is listed as "Primary" for Christiaan — but that assumes the FDE role is more advisory/implementation than data science engineering. This Databricks FDE leans heavily into ML engineering depth (PyTorch, scikit-learn, production deployments on cloud platforms). That's the critical gap.

---

## C) Level and Strategy

**Level detected:** All levels explicitly stated; likely looking for mid-to-senior based on requirements (production ML, eval frameworks, enterprise client management)

**Christiaan's natural level for this archetype:** He maps to the advisory/facilitation half of this role well, but not the ML engineering half. In Databricks' framing, he would not pass technical screening for the engineering components.

**"Sell senior without lying" plan:**
- Lead with the KONGSBERG enterprise delivery track record (BP, Statoil — real enterprise client-facing technical delivery)
- Lead with AI stack operational depth (self-hosted, production, real users)
- Lead with technical communication and workshop/training capabilities as the differentiator
- But be honest: the data science engineering depth (ML libraries, cloud ML platforms) is not there

**"If they downlevel me" — not applicable:** The gap is not about level, it's about the wrong skill set for an engineering-forward FDE role.

**Honest assessment:** Christiaan should explore "Technical AI PM" or "Solutions Consultant" adjacent roles at Databricks, not the engineering FDE track. The advisory and communication skills are there; the ML engineering is not.

---

## D) Comp and Demand

| Metric | Estimate | Source |
|--------|----------|--------|
| Market range (AI FDE, Amsterdam, all levels) | €70,000–€130,000 base (junior to senior) + RSUs | Glassdoor Databricks FDE/Professional Services EMEA; Levels.fyi |
| Databricks compensation reputation | Strong base + RSU package; total comp can be 20-40% above base | Known industry data |
| Christiaan's target range | €65,000–€90,000 | _profile.md |
| Fit | The lower end of the range overlaps with Christiaan's target if applying at junior/mid level |

Note: Compensation overlap exists at the lower end. But the technical requirements mean this is unlikely to progress to offer stage.

---

## E) Customization Plan

Not recommended. Provided if user wishes to override:

| # | Section | Current | Proposed change | Why |
|---|---------|---------|-----------------|-----|
| 1 | Summary | Lab builder / educator | Reframe as "applied AI practitioner building AI-powered workflows and research infrastructure" | Closest honest frame |
| 2 | Windesheim AI Stack | "Self-hosted AI sandbox" | Describe architecture explicitly: Docker-deployed, n8n/Flowise/OpenWebUI/Supabase, managing inference endpoints for student use | Shows production ops depth |
| 3 | KONGSBERG experience | Listed as BP/Statoil deployments | Lead with "enterprise client-facing technical delivery" — most relevant analog to FDE model | Real signal |
| 4 | VCH | Supply chain AI tools | Frame as "built AI compliance tooling for EUDR/CSRD — practical GenAI applications with real business users" | Honest applied AI proof |
| 5 | Data Analysis cert | Listed under certifications | Surface alongside Python skills to indicate ML literacy floor | Minimal but relevant |

---

## F) Interview Plan

Abbreviated — role not recommended.

| # | JD Requirement | STAR+R Story | Reflection |
|---|----------------|--------------|------------|
| 1 | Client-facing technical delivery | KONGSBERG BP Jordan: full BI implementation — hardware, server config, software, dashboards, on-site training | Enterprise client delivery is real; tech era is old but pattern is identical |
| 2 | Building AI applications for real users | Windesheim AI stack: self-funded, Docker-deployed, production use by students and researchers | Shows initiative and production orientation; gap is depth of ML stack |
| 3 | Technical communication to diverse audiences | Blockchain Minor at InHolland: designed "Build Your Own Crypto" course, still running independently | Expert communicator of complex technical concepts |
| 4 | Travel and customer engagement | KONGSBERG: multiple countries (Jordan, Oman, Norway, Azerbaijan) in field service | Comfortable with travel for customer work |

**Red-flag questions:**
- "Walk me through a RAG system you built end-to-end." → Honest answer: "I've deployed Flowise (which abstracts RAG), but I haven't built a custom RAG pipeline from scratch with LangChain or LlamaIndex. That's a gap I'd close quickly given the learning budget."
- "What's your experience with PyTorch or scikit-learn in production?" → Honest answer: "Data analysis in Python for research and coursework, but not production ML model training. My strength is at the application and integration layer."

---

## G) Posting Legitimacy

**Assessment: High Confidence**

| Signal | Finding | Weight |
|--------|---------|--------|
| Posting freshness | Active on Greenhouse API, requisition ID present | Positive |
| Apply button | Active | Positive |
| JD specificity | Highly specific — named technologies (RAG, multi-agent, Text2SQL, pandas, scikit-learn, PyTorch, AWS/Azure/GCP), named team structure (Senior Manager AI FDE EMEA) | Positive |
| Requirements realism | Consistent and realistic for a professional services engineering role at this level | Positive |
| Company hiring signals | Databricks consistently growing professional services capacity in EMEA | Positive |
| Role-company fit | Core business model — PS teams deliver against the platform | Positive |

---

## H) Culture, Personality & Long-term Fit

### H1 — Org Culture Assessment

**Stage and type:** Databricks is pre-IPO, high-growth. The AI FDE (Forward Deployed Engineer) team is a technical customer-facing PS function — part ML engineer, part consultant, part thought leader. The culture of this specific team tends to be high-energy, technically driven, and fast-moving. FDE roles at companies like Databricks attract people who want to be at the intersection of cutting-edge AI research and enterprise delivery.

**Culture signals:** The JD mentions "present at conferences and serve as thought leader," "fueling curiosity for the latest trends in GenAI," "collaborate with product and engineering on roadmap priorities." This is a technically ambitious, community-visible, curiosity-driven culture within the commercial PS wrapper.

**Physical/work environment:** Remote Netherlands (preferred Amsterdam). Quarterly customer travel. The base environment is remote, with periodic client sites and Databricks events.

**Hackerspace vision match:** Moderate. The technical curiosity culture, thought leadership mandate, and frontier AI focus (GenAI, LLMOps, multi-agent) align with the hackerspace energy. The "new territory" element is genuinely present — this is a fast-moving frontier. But the enterprise client delivery context (Fortune 500 customers, production ML) requires sustained technical depth that is currently missing. Score: 6/10 against the 2-year vision if the skill gap were resolved.

### H2 — Personality Fit Table

| Dimension | What the role requires | Christiaan's profile | Match |
|-----------|----------------------|---------------------|-------|
| Starter vs. finisher | Each new customer engagement has a 0-to-1 element (new problem, new architecture) | ENFP-T starter | Good match — the per-engagement cycle rewards the starter energy |
| Variety vs. repetition | High variety: new customers, new use cases, new GenAI techniques | Thrives on variety | Strong match — FDE is one of the highest-variety PS roles |
| Autonomy level | High autonomy within each engagement | Needs ownership | Good match |
| Build vs. maintain | Building GenAI applications for each customer — build mandate per engagement | Builder identity | Strong match — each deployment is a build |
| Fractional fit | Full-time implied; but quarterly travel model is lighter than 50% | Optimal: 2-3 concurrent 0.4-0.6 FTE | Structural conflict but lighter than Elastic/Munich |
| Energy spike tolerance | Technical curiosity culture; conference thought leadership rewards visible energy | Front-loaded high energy | Good fit — the culture rewards the energy spike |
| Team size | EMEA FDE team — likely a small, niche technical team | Small team, high trust | Good fit |

**Flags:** fractional conflict; ML engineering skill gap creates critical imposter risk in this specific team culture.

### H3 — Values & Mission Alignment

The AI FDE culture — building at the frontier, sharing knowledge publicly, solving real enterprise problems with cutting-edge techniques — is genuinely aligned with Christiaan's identity as a builder and educator. The thought leadership and conference presence component is an intrinsic motivator (guest lectures unpaid, knowledge sharing is part of his identity). The "fueling curiosity" framing is exactly the kind of culture he would thrive in.

The problem is the ML engineering gap creates a values mismatch of a different kind: being in a room where colleagues are discussing PyTorch fine-tuning and custom RAG pipelines from scratch, without the depth to contribute at that level, would generate chronic imposter syndrome and undermine the energy and authenticity that are Christiaan's strengths.

**Verdict:** Mission alignment is high. Skills alignment is low. The culture would be right; the current technical level does not match it.

### H4 — Energy Analysis

**Energizers:**
- Per-engagement variety: each new customer is a new problem
- Frontier AI domain: GenAI, LLMOps, multi-agent — genuinely exciting territory
- Thought leadership and conference presence: public knowledge sharing is intrinsic
- Small EMEA team with high technical curiosity culture
- Build mandate per engagement: every FDE project has something to create
- Customer communication component: explaining complex AI to diverse audiences is a genuine strength

**Drains:**
- ML engineering depth gap: the gap between "runs AI tools" and "builds ML systems from scratch" creates sustained anxiety in a team of ML engineers
- Production ML accountability: being responsible for production GenAI systems you did not build from scratch creates a specific kind of stress
- Full-time exclusivity: blocks the multi-engagement model
- The ramp time to close the ML engineering gap is 6-12 months minimum — that is a long period of imposter experience in a technically scrutinizing team

### H5 — 18-Month Durability Test

**Rating: Short-term fit IF the skill gap is closed first. Not viable at current skill level.**

If Christiaan spent 6-12 months deliberately building ML engineering depth (LangChain, PyTorch basics, RAG from scratch, LLMOps tooling), this role would become a strong fit: the culture is right, the variety is right, the domain is right, the thought leadership mandate is right. But applying now and ramping on the skills on the job would be a very difficult experience in a technically exacting peer environment.

If hired at a junior level with an explicit learning mandate, the 18-month trajectory could be positive — but that requires the company to accept a practitioner-level hire on the engineering track.

### H6 — Personality-Specific Red Flags

| Red flag | Present? | Severity | Context |
|----------|----------|----------|---------|
| Role is primarily maintenance/ops | No | N/A | Each engagement has a build mandate |
| Solo sales of an unready product | No | N/A | Not a sales role |
| Full-time exclusivity expected | Yes | Medium | Full-time implied; lighter travel model than some |
| Large corporate, slow decision cycles | No | N/A | Databricks moves fast; FDE team is agile |
| Ceremony-only role | No | N/A | Not applicable |
| Governance in decline | No | N/A | Not applicable |

### H7 — Fit Verdict

**Case FOR:** The FDE culture at Databricks is arguably the best cultural environment of all ten roles evaluated in this batch: frontier AI, small technical team, high variety, thought leadership, build mandate per engagement, customer communication. The personality fit on every dimension except the skill gap is genuinely strong. If Christiaan closes the ML engineering gap, this becomes a 4.0+ role.

**Case AGAINST (watch for):** The ML engineering gap is not a framing problem — it is a technical depth problem that a technically sophisticated peer group will surface quickly. Joining this team at current skill level would place Christiaan in a chronically uncomfortable position. The culture match being high makes the skill gap more painful, not less, because the culture is exactly what would motivate Christiaan to perform — and the performance ceiling is set by a skill he does not yet have.

**Score cap note:** The 2.5/5 score reflects the skill gaps. The culture fit assessment confirms the score is appropriate: strong culture potential, low current viability. The right recommendation is "build toward this archetype, not apply now."

**Overall personality/culture fit: Conditional** (strong culture match; conditional on ML engineering skill development)

---

## Keywords extracted

Forward Deployed Engineer, FDE, GenAI, RAG, multi-agent, Text2SQL, fine-tuning, LLMOps, pandas, scikit-learn, PyTorch, AWS, Azure, GCP, Databricks Intelligence Platform, Apache Spark, production ML, professional services, customer-facing, EMEA, evaluation frameworks, AI applications

---

## Job Description (archived)
*Archived 2026-05-21 — original posting may be removed after offer closes*

**Title:** AI Engineer - FDE (Forward Deployed Engineer) (ALL LEVELS)
**Requisition ID:** CSQ327R197
**Location:** Netherlands - Remote (preferred: London, Madrid, Paris, Amsterdam)
**Department:** Professional Services Operations
**Recruiter:** Dina Hussain
**Reports to:** Senior Manager - AI FDE, EMEA

**Mission:**
The AI FDE team delivers professional services to help customers build and productionize AI applications. The role involves working with customers, teammates, and fueling curiosity for the latest trends in GenAI, LLMOps, and ML.

**Key Responsibilities:**
- Develop GenAI solutions using latest research techniques
- Own production rollouts of consumer and internally facing GenAI applications
- Serve as trusted technical advisor to customers
- Present at conferences and serve as thought leader
- Collaborate with product and engineering teams on roadmap priorities

**Requirements:**
- Experience building GenAI applications (RAG, multi-agent systems, Text2SQL, fine-tuning)
- Expertise deploying production-grade GenAI applications with evaluation capabilities
- Extensive hands-on data science experience with pandas, scikit-learn, PyTorch
- Production ML deployments on AWS, Azure, or GCP
- Quantitative degree or equivalent experience
- Technical communication skills
- Willingness to travel quarterly for customer visits

**Preferred:**
- Databricks Intelligence Platform and Apache Spark experience

**About Databricks:** Over 10,000 organizations including Fortune 500 companies rely on the Databricks Data Intelligence Platform for unified data, analytics, and AI capabilities.
