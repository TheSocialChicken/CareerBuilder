#!/usr/bin/env node
/**
 * generate-tailored-cvs.mjs
 * Generates tailored cv.html + cv.pdf for each application scoring >= 3.0
 * Usage: node generate-tailored-cvs.mjs
 */

import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================
// BASE CONTENT (shared across all CVs)
// ============================================================

const BASE_EXPERIENCE = `
  <div class="job">
    <div class="job-header">
      <span class="job-company">Viridis Green-Tech AG</span>
      <span class="job-period">2024 – Present</span>
    </div>
    <div class="job-role">Innovation Architect <span class="job-location">Munich, Germany (Remote)</span></div>
    <ul>
      <li><strong>Blockchain Ecosystem Architecture</strong> -- Defined and prototyped structure for blockchain-powered supply chain traceability and verifiability system in DACH market</li>
      <li><strong>Business Alignment</strong> -- Aligned lab projects with commercial development and sustainability goals; co-authored early-stage grant proposals for open infrastructure and compliance tooling</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Windesheim University of Applied Sciences</span>
      <span class="job-period">Jan 2020 – Present</span>
    </div>
    <div class="job-role">Project Manager -- Supply Chain Finance Lectoraat <span class="job-location">Zwolle, Netherlands</span></div>
    <ul>
      <li><strong>Value Chain Hackers</strong> -- Created AI-driven innovation lab for supply chain traceability, sustainability, and CSRD/EUDR compliance; deployed full AI stack (Flowise, OpenWebUI, n8n, Supabase) on self-managed Linux/Docker infrastructure</li>
      <li><strong>COVID-19 Mega Project</strong> -- Merged 8 interdisciplinary university courses into single simulation-based program in under 2 months; mapped dependencies, ran cross-lead reviews, rebuilt assessment model mid-flight</li>
      <li><strong>Spark! Living Lab</strong> -- Founded and ran blockchain-based simulation and agile supply chain education lab; delivered the BlockBeer game; cross-European programs running 5 years on</li>
      <li><strong>DevOps</strong> -- Full lifecycle (provisioning, containerization, CI/CD, monitoring, incident response) across all lab environments since 2020; 10+ years DevOps practice</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Tonomy Foundation</span>
      <span class="job-period">2021 – Present</span>
    </div>
    <div class="job-role">Co-Founder &amp; Board Member <span class="job-location">Amsterdam &amp; Remote</span></div>
    <ul>
      <li><strong>Pangea Vault</strong> -- Co-designed first version of Tonomy's MICA-compliant digital identity vault; W3C-recognized open-source ecosystem</li>
      <li>Led strategy, technical positioning, partner development, and community operations on 2-week agile sprint cycles; transitioned to board oversight</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">COTIT</span>
      <span class="job-period">Jan 2024 – Jul 2024</span>
    </div>
    <div class="job-role">Business Innovator <span class="job-location">Almere, Netherlands</span></div>
    <ul>
      <li>Defined functional SaaS sales cycle, restructured internal roles and workflows using agile methods, provided financial organization guidance for early scale-up phase</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Open Food Chain</span>
      <span class="job-period">2022 – 2024</span>
    </div>
    <div class="job-role">Community Manager <span class="job-location">Amsterdam / Remote</span></div>
    <ul>
      <li>Built and moderated technical and stakeholder community (Discord); ran agile sprints for software development; wrote smart contracts; supported investor outreach that led to new investment</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Aeres Hogeschool Dronten</span>
      <span class="job-period">2021 – 2022</span>
    </div>
    <div class="job-role">Lab Manager <span class="job-location">Dronten, Netherlands</span></div>
    <ul>
      <li><strong>Agile Course Integration</strong> -- Implemented agile learning model merging 8 separate courses into one sprint cycle using SafeScrum in under 2 months</li>
      <li><strong>Veles Farming</strong> -- Recognized potential in student project, seed-invested, supported launch; now operating agri-tech startup in Slovakia (EUR 2M funding)</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Social Chicken</span>
      <span class="job-period">2016 – 2022</span>
    </div>
    <div class="job-role">Freelance Senior Project Manager &amp; Educator <span class="job-location">Amsterdam, Netherlands</span></div>
    <ul>
      <li>Delivered private cloud setups, database migrations, and BI dashboards for SMEs; full DevOps stack including Linux, Nagios monitoring, CI/CD pipelines</li>
      <li><strong>Interactive</strong> -- Technical due diligence of pre-seed startup codebase; positive investment recommendation; 4x exit achieved</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Hogeschool InHolland</span>
      <span class="job-period">2021 – 2022</span>
    </div>
    <div class="job-role">Guest Lecturer &amp; Course Designer <span class="job-location">Netherlands</span></div>
    <ul>
      <li>Designed and delivered Blockchain Minor ("Build Your Own Crypto") and Dashboarding &amp; Analysis courses; both still in active independent use; identified and sponsored Magic Frames and Veles Farming student ventures</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">The Fork (now Open Food Chain)</span>
      <span class="job-period">2018 – 2020</span>
    </div>
    <div class="job-role">Head Trainer &amp; Innovator <span class="job-location">Amsterdam, Netherlands</span></div>
    <ul>
      <li>Led professional training in digital food technology; hired and mentored students to co-develop production software; managed DevOps infrastructure; designed physical blockchain training object making abstract concepts tangible</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">ROC Midden Nederland</span>
      <span class="job-period">2018 – 2020</span>
    </div>
    <div class="job-role">Freelance Educator -- Agile Learning &amp; Digital Projects <span class="job-location">Utrecht, Netherlands</span></div>
    <ul>
      <li>Designed agile classroom format mimicking startup environments; gamified role-play modules where students practiced presentation, negotiation, and digital strategy</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">KONGSBERG</span>
      <span class="job-period">2012 – 2013</span>
    </div>
    <div class="job-role">Field Service Engineer / Data Quality Consultant <span class="job-location">Kristiansand, Norway</span></div>
    <ul>
      <li><strong>BP Jordan &amp; Oman</strong> -- End-to-end BI implementation: hardware installation, server/MOXA configuration, software rollout, data configuration, dashboard creation, on-site staff training and sign-off</li>
      <li><strong>Statoil</strong> -- Production analytics deployment, user training, and documentation</li>
      <li><strong>BP Azerbaijan</strong> -- Data-transfer integrity oversight between partner systems; defined standards, monitored compliance, trained client staff</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">Meerschap B.V.</span>
      <span class="job-period">2010 – 2011</span>
    </div>
    <div class="job-role">System Manager &amp; Researcher <span class="job-location">Amsterdam, Netherlands</span></div>
    <ul>
      <li>Implemented and customized Nagios monitoring for hospitals, pharmacies, and mortgage firms; hardware installation, system maintenance, and workflow automation</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-company">WDS Global</span>
      <span class="job-period">2008 – 2010</span>
    </div>
    <div class="job-role">Technical Support Engineer (3rd Line) &amp; Trainer <span class="job-location">Poole, England</span></div>
    <ul>
      <li>Cleared 10,000+ email backlog in Dutch support department by redesigning templates and workflows; designed HTC tutorial video series later adopted globally; trained Tesco Scotland retail staff on smartphone sales</li>
    </ul>
  </div>
`;

const BASE_EDUCATION = `
  <div class="edu-item">
    <div class="edu-header">
      <span class="edu-title">Bachelor of Business Administration, Business IT &amp; Management</span>
      <span class="edu-year">2010 – 2014</span>
    </div>
    <div class="edu-desc"><span class="edu-org">Hogeschool van Amsterdam</span> -- Grade 8.7. Thesis: simulation-based learning and training methodology at Kongsberg.</div>
  </div>
  <div class="edu-item">
    <div class="edu-header">
      <span class="edu-title">Technical Informatics</span>
      <span class="edu-year">2006 – 2007</span>
    </div>
    <div class="edu-desc"><span class="edu-org">Hogeschool van Amsterdam</span></div>
  </div>
  <div class="edu-item">
    <div class="edu-header">
      <span class="edu-title">Senior General Secondary Education (HAVO), Theoretical &amp; Mathematical Physics</span>
      <span class="edu-year">2002 – 2006</span>
    </div>
    <div class="edu-desc"><span class="edu-org">Hermann Wesselink College</span></div>
  </div>
`;

const BASE_CERTIFICATIONS = `
  <div class="cert-item">
    <span class="cert-title">Scrum Master</span>
    <span class="cert-org">Scrum.org</span>
    <span class="cert-year">2018</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">Professional Scrum Product Owner I (PSPO I)</span>
    <span class="cert-org">Scrum.org</span>
    <span class="cert-year">2019</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">PRINCE2</span>
    <span class="cert-org">Axelos</span>
    <span class="cert-year">2019</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">ITIL Foundation</span>
    <span class="cert-org">Axelos</span>
    <span class="cert-year">2019</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">Train the Trainer (Blockchain)</span>
    <span class="cert-org">Blockchain Workspace</span>
    <span class="cert-year">2021</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">ESG &amp; Sustainable Supply Chains</span>
    <span class="cert-org">Online</span>
    <span class="cert-year">2023</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">Data Analysis &amp; Visualization (R, Python)</span>
    <span class="cert-org">Online</span>
    <span class="cert-year">2020</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">Oracle 11g Essentials &amp; SOA Concepts</span>
    <span class="cert-org">Oracle</span>
    <span class="cert-year">2012</span>
  </div>
  <div class="cert-item">
    <span class="cert-title">Offshore Survival Training / HUET</span>
    <span class="cert-org">Falck</span>
    <span class="cert-year">2012</span>
  </div>
`;

const BASE_SKILLS = `
  <div class="skills-grid">
    <div class="skill-item"><span class="skill-category">Program Management:</span> Prince2, ITIL, sprint planning, budget management, grant writing (EUR 2M secured), stakeholder reporting</div>
    <div class="skill-item"><span class="skill-category">Agile &amp; Facilitation:</span> Scrum Master (15+ yr), Kanban, SafeScrum, PSPO I, workshop design, simulation-based learning, retrospectives</div>
    <div class="skill-item"><span class="skill-category">DevOps &amp; Infrastructure:</span> Docker, Kubernetes, GitHub CI/CD, Jenkins, Linux (Ubuntu/CentOS/Debian), Nagios, Grafana, PostgreSQL, MySQL, Oracle SOA</div>
    <div class="skill-item"><span class="skill-category">AI Stack:</span> Flowise, OpenWebUI, n8n, Supabase, LLM deployment, self-hosted AI infrastructure, prompt engineering</div>
    <div class="skill-item"><span class="skill-category">Blockchain &amp; Identity:</span> SSI, MICA compliance, Ethereum, smart contracts, HyperLedger, EOSIO, supply chain traceability</div>
    <div class="skill-item"><span class="skill-category">Business:</span> business development, process design, stakeholder alignment, partner ecosystems, startup incubation (10 ventures advised or co-founded)</div>
    <div class="skill-item"><span class="skill-category">Languages:</span> Dutch (native), English (near-native), German (conversational)</div>
  </div>
`;

// ============================================================
// PROJECT HTML BLOCKS
// ============================================================

const P_VCH = `
  <div class="project">
    <div><span class="project-title">Value Chain Hackers</span><span class="project-badge">2024 - Present</span></div>
    <div class="project-desc">Cross-European initiative building AI-powered supply chain traceability and compliance tools for CSRD, CSDDD, and EUDR. Principal investigator for Windesheim Supply Chain Finance lectorate innovation agenda. Deployed full AI stack on self-managed infrastructure.</div>
    <div class="project-tech">valuechainhackers.xyz</div>
  </div>`;

const P_BEERGAME = `
  <div class="project">
    <div><span class="project-title">The Beergame (Redesign)</span><span class="project-badge">2020</span></div>
    <div class="project-desc">Rebuilt the classic logistics bullwhip-effect simulation with a modern teaching format and interface; blockchain vs. non-blockchain comparison version for supply chain education across Benelux institutions.</div>
    <div class="project-tech">demonstrator.valuechainhackers.xyz</div>
  </div>`;

const P_2BSMART = `
  <div class="project">
    <div><span class="project-title">2bSMART</span><span class="project-badge">2020 - 2022</span></div>
    <div class="project-desc">Delivered blockchain technology training using interactive logistics simulations for supply chain professionals across Benelux. Collaborated on design of Smartys simulation platform. Cross-European consortium project.</div>
    <div class="project-tech">2bsmart.cz</div>
  </div>`;

const P_MAGICFRAMES = `
  <div class="project">
    <div><span class="project-title">Magic Frames</span><span class="project-badge">2022 - 2025</span></div>
    <div class="project-desc">Guided student startup from early concept to independent launch; evolved from fashion-tech to platform for music artists blending storytelling, event culture, and lenticular photography. Directly sponsored and mentored to launch.</div>
    <div class="project-tech">mgframes.nl</div>
  </div>`;

const P_INTERACTIVE = `
  <div class="project">
    <div><span class="project-title">Interactive -- Technical Due Diligence</span><span class="project-badge">2021 - 2022</span></div>
    <div class="project-desc">Performed full technical due diligence of pre-seed startup codebase; issued positive investment recommendation; startup achieved 4x exit. Assessed architecture, scalability, and team capability.</div>
  </div>`;

const P_ESIEA = `
  <div class="project">
    <div><span class="project-title">ESIEA -- Digital Forensics Research</span><span class="project-badge">2012</span></div>
    <div class="project-desc">Led international team in advanced digital forensics research using the EDRM framework on large, sensitive datasets for geopolitical risk analysis. Findings received formal recognition; invited to present at international research forum.</div>
  </div>`;

const P_FARMCREDIBLY = `
  <div class="project">
    <div><span class="project-title">Farm Credibly</span><span class="project-badge">Jamaica</span></div>
    <div class="project-desc">Dutch agri-tech and blockchain farmer financing initiative in Jamaica; aligned Dutch agricultural technology methods with Caribbean context to enable financial inclusion for smallholder farmers.</div>
  </div>`;

// ============================================================
// ROLE CONFIGURATIONS
// ============================================================

const ROLES = [
  {
    slug: '008-gitlab-engagement-manager-emea',
    summary: 'Senior practitioner in discovery-to-delivery cycles -- structured complex programs for universities, labs, and funded initiatives across Europe. Delivered enterprise BI implementations for BP and Statoil at KONGSBERG: scoped, configured, trained, and signed off. 15+ years bridging technical delivery and stakeholder alignment. DevOps-native (Docker, Kubernetes, CI/CD) with direct experience managing €2M in funded project portfolios.',
    competencies: [
      'Professional Services Delivery', 'Stakeholder Alignment', 'Discovery & Scoping',
      'Program Orchestration', 'Enterprise Client Delivery', 'Multi-site Implementation',
      'Agile Program Management', 'DevOps & CI/CD', 'Grant & Contract Management',
      'Cross-functional Facilitation',
    ],
    projects: P_VCH + P_2BSMART + P_INTERACTIVE + P_BEERGAME,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '009-gitlab-staff-tpm',
    summary: 'Technical program manager with 15+ years running complex, multi-workstream programs under ambiguity. Merged 8 interdependent course systems in under 2 months (COVID-19 mega project): mapped dependencies, ran weekly cross-lead reviews, rebuilt assessment model mid-flight, delivered on schedule. Runs Docker, Kubernetes, CI/CD pipelines, and self-hosted AI infrastructure daily. Understands what engineers are building well enough to surface the program dependencies they miss.',
    competencies: [
      'Technical Program Management', 'Multi-workstream Coordination', 'Dependency Mapping',
      'Cross-functional Alignment', 'DevOps & CI/CD', 'Docker & Kubernetes',
      'Sprint Planning & Release Mgmt', 'Stakeholder Management', 'Risk Identification',
      'Delivery Under Ambiguity',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '010-gitlab-ai-transformation-owner',
    summary: 'AI Transformation practitioner -- designs the environments where organizations adopt new capabilities. Built 5+ innovation labs from zero. Deployed AI stacks from scratch: n8n, Flowise, OpenWebUI, Supabase, all self-managed on Linux/Docker. Runs champion networks, runs practitioner interviews, turns early adopters into institutional change agents. Applied in education, supply chain compliance, and blockchain ecosystems across Europe.',
    competencies: [
      'AI Transformation Strategy', 'Change Management', 'Champion Network Building',
      'n8n Workflow Automation', 'Flowise & OpenWebUI Deployment', 'AI Infrastructure',
      'Organizational Change', 'Workshop Facilitation', 'Innovation Lab Design',
      'LLM Stack Operations',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_MAGICFRAMES,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '011-adyen-learning-experience-design-pm',
    summary: 'Learning experience designer and program manager with expertise in simulation-based learning, game-based education, and AI-integrated delivery. Bachelor thesis (grade 8.7) on simulation-based training methodology at Kongsberg. Full-stack LXD from needs assessment through iteration: designed the 2bSMART simulation platform, rebuilt the Beergame for modern audiences, created gamified agile learning environments at ROC and Aeres. Delivered 10+ courses still in active independent use.',
    competencies: [
      'Learning Experience Design', 'Simulation-based Learning', 'Game-based Education',
      'Curriculum Design', 'Instructional Design', 'Needs Assessment',
      'LXD Program Management', 'Learning Analytics', 'Agile Learning Development',
      'Train the Trainer',
    ],
    projects: P_2BSMART + P_BEERGAME + P_MAGICFRAMES + P_VCH,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '012-adyen-team-lead-ld',
    summary: 'Built and led learning organizations at institutional scale -- designed the architecture, led the teams, and owned the outcomes across full delivery cycle. Spark! Living Lab: still running 5 years on across cross-European programs. Implemented school-wide Scrum at Aeres Hogeschool: 8 courses merged into one sprint-based innovation track in under 2 months. 15+ years as agile practitioner and facilitator across education, tech, and research organizations.',
    competencies: [
      'L&D Team Leadership', 'Learning Strategy', 'Institutional Learning Design',
      'Agile Education', 'Program Management', 'Stakeholder Alignment',
      'Innovation Lab Design', 'Facilitation at Scale', 'Multi-course Architecture',
      'Coaching & Mentorship',
    ],
    projects: P_2BSMART + P_BEERGAME + P_MAGICFRAMES + P_VCH,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '017-celonis-head-of-industry-retail-cpg',
    summary: 'Domain-agnostic innovation builder with 0-to-1 execution track record across supply chain AI, sustainability, and CSRD/EUDR compliance. Built the Value Chain Hackers initiative at Windesheim: AI-powered traceability tooling live at valuechainhackers.xyz, built with a cross-European research and student team. The 0-to-1 pattern is documented across every chapter: Spark! Living Lab, Aeres, Tonomy Foundation. Building mandates are the documented strength.',
    competencies: [
      'Supply Chain Innovation', 'CSRD/EUDR Compliance', '0-to-1 Practice Building',
      'Process Intelligence', 'Value Engineering', 'Cross-functional Team Leadership',
      'Retail & CPG Supply Chain', 'AI Traceability Tools', 'Partner Ecosystem Development',
      'Grant Funding & Innovation Programs',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_FARMCREDIBLY,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    slug: '020-anthropic-applied-ai-architect',
    summary: 'Applied AI practitioner with enterprise field delivery and a track record of making complex systems accessible. Delivered BI implementations for BP and Statoil at KONGSBERG across Jordan, Oman, and Azerbaijan: hardware to training to sign-off. Self-hosted and operates LLM infrastructure (Flowise, OpenWebUI, n8n, Supabase) on self-managed Linux/Docker for live researcher use at Windesheim. Teaches practitioners how to use AI tools; designs the environments where adoption happens.',
    competencies: [
      'Applied AI Architecture', 'Enterprise AI Delivery', 'LLM Stack Design & Operations',
      'Flowise & OpenWebUI', 'n8n & Supabase', 'BI System Deployment',
      'Training & Enablement Design', 'Safety-aware AI Design', 'Technical Communication',
      'Field Delivery at Executive Level',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    slug: '021-canonical-pm-ai',
    summary: 'Product manager by practice: owned AI research platform from discovery through adoption at Windesheim; co-defined product vision for Pangea Vault at Tonomy Foundation; built Spark! Living Lab roadmap across 5 years of cross-European programs. Open source infrastructure and Linux DevOps are the home domain -- runs Ubuntu-based stacks daily. Domain expertise in CSRD/EUDR supply chain compliance positions directly for Canonical\'s open-source enterprise market.',
    competencies: [
      'Product Management', 'AI Research Platform Ownership', 'Open Source Ecosystem',
      'Ubuntu & Linux DevOps', 'Product Discovery & Roadmap', 'Stakeholder Alignment',
      'DevOps Infrastructure', 'CSRD/EUDR Domain', 'Community Product',
      'Agile Sprint Cycles',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    slug: '023-canonical-software-alliance-ecosystem',
    summary: 'Software ecosystem builder with 10+ years of DevOps on Ubuntu-based Linux infrastructure. Co-built the Tonomy open-source ecosystem (W3C-recognized); ran Open Food Chain partner and community networks. Built enablement content adopted globally by HTC. Combines the technical credibility of an operator (Docker, Kubernetes, CI/CD, self-hosted AI stacks) with the ecosystem development skills of a builder -- alliance management, partner onboarding, and community activation.',
    competencies: [
      'Software Ecosystem Building', 'Ubuntu Linux Operations', 'DevOps & Infrastructure',
      'Partner Network Development', 'Open Source Governance', 'Technical Community',
      'Blockchain Ecosystem (W3C)', 'Tutorial & Enablement Content', 'Alliance Management',
      'Docker & Kubernetes',
    ],
    projects: P_VCH + P_2BSMART + P_INTERACTIVE + P_BEERGAME,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    slug: '025-databricks-sr-engagement-manager-munich',
    summary: 'Trusted advisor and delivery practitioner with enterprise field experience across Jordan, Oman, and Azerbaijan. Delivered for BP and Statoil at KONGSBERG: full system implementation, user training, and executive sign-off. Currently works with Viridis Green-Tech in Munich -- direct DACH market familiarity and active German working context. Operates at executive level in high-stakes delivery contexts; named what was wrong on an oil rig from 3000km away and held the conversation.',
    competencies: [
      'Executive Advisory', 'Enterprise Delivery', 'Trusted Advisor Motion',
      'DACH Market', 'Stakeholder Management', 'Field Delivery (Jordan/Oman/Azerbaijan)',
      'Engagement Management', 'Business Development', 'Program Orchestration',
      'Multi-site Implementation',
    ],
    projects: P_VCH + P_INTERACTIVE + P_2BSMART + P_ESIEA,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '028-n8n-ai-product-builder',
    summary: 'Builder and operator of AI workflows -- runs n8n in production at Windesheim for supply chain compliance checking, research onboarding, and agent routing. Built 5 innovation labs and incubated 10 ventures from concept to working product. 0-to-1 product ownership is the documented pattern across every chapter of the career. Can demo workflows that run in production, not polished prototypes. Full self-hosted stack: n8n, Flowise, OpenWebUI, Supabase on Linux/Docker.',
    competencies: [
      'n8n Workflow Automation (Production)', 'AI Product Building', '0-to-1 Product Ownership',
      'Flowise & OpenWebUI', 'Supabase', 'Docker & Kubernetes',
      'Supply Chain AI', 'Production AI Stack Operations', 'Innovation Lab Management',
      'Builder Mindset',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_MAGICFRAMES,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    slug: '029-gitlab-program-manager-london',
    summary: 'Program manager with deep methodology stack (Prince2, ITIL, Scrum Master, PSPO I) and 15+ years cross-functional delivery across universities, labs, innovation programs, and enterprise client engagements. Managed enterprise system implementations for BP and Statoil at KONGSBERG -- multi-country, multi-site, scoped deliverables with formal sign-off. DevOps background native to the GitLab domain: Docker, Kubernetes, CI/CD pipelines, GitHub -- operated daily for 10+ years.',
    competencies: [
      'Program Management', 'Prince2 & ITIL', 'Scrum Master & PSPO I',
      'Multi-stakeholder Delivery', 'Enterprise Client Management', 'DevOps Native',
      'CI/CD Pipelines', 'Docker & Kubernetes', 'Process Design',
      'Agile Program Management',
    ],
    projects: P_VCH + P_2BSMART + P_INTERACTIVE + P_BEERGAME,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    slug: '030-stripe-pm-intake-portfolio',
    summary: 'Program manager and systems builder with expertise in AI-powered intake and portfolio management. Built n8n workflow automations for research onboarding and supply chain compliance checking at Windesheim. Managed 8-workstream COVID-19 portfolio under pandemic constraints: dependency graph from scratch, weekly cross-lead reviews, mid-flight assessment model rebuild, full on-schedule delivery. Prince2, ITIL, Scrum Master, PSPO I -- methodology depth underpins reliable delivery.',
    competencies: [
      'Portfolio Management', 'AI-powered Intake (n8n)', 'Program Orchestration',
      'Multi-workstream Delivery', 'Process Design', 'Stakeholder Alignment',
      'Research Portfolio Management', 'Agile Methodology', 'Systems Builder',
      'Prince2 & ITIL',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
];

// ============================================================
// GENERATOR
// ============================================================

async function main() {
  const templatePath = resolve(__dirname, 'templates', 'cv-template.html');
  const template = await readFile(templatePath, 'utf-8');

  for (const role of ROLES) {
    const competenciesHTML = role.competencies
      .map(t => `<span class="competency-tag">${t}</span>`)
      .join('\n      ');

    const html = template
      .replaceAll('{{LANG}}', 'en')
      .replaceAll('{{NAME}}', 'Christiaan Verhoef')
      .replaceAll('{{PAGE_WIDTH}}', '210mm')
      .replaceAll('{{PHONE}}', '+31 6 30 18 47 43')
      .replaceAll('{{EMAIL}}', 'christiaan_gerardo@hotmail.com')
      .replaceAll('{{LINKEDIN_URL}}', 'https://linkedin.com/in/christiaanverhoef')
      .replaceAll('{{LINKEDIN_DISPLAY}}', 'linkedin.com/in/christiaanverhoef')
      .replaceAll('{{PORTFOLIO_URL}}', role.portfolio_url)
      .replaceAll('{{PORTFOLIO_DISPLAY}}', role.portfolio_display)
      .replaceAll('{{LOCATION}}', 'Baarn, Netherlands')
      .replaceAll('{{SECTION_SUMMARY}}', 'Professional Summary')
      .replaceAll('{{SUMMARY_TEXT}}', role.summary)
      .replaceAll('{{SECTION_COMPETENCIES}}', 'Core Competencies')
      .replaceAll('{{COMPETENCIES}}', competenciesHTML)
      .replaceAll('{{SECTION_EXPERIENCE}}', 'Work Experience')
      .replaceAll('{{EXPERIENCE}}', BASE_EXPERIENCE)
      .replaceAll('{{SECTION_PROJECTS}}', 'Selected Projects')
      .replaceAll('{{PROJECTS}}', role.projects)
      .replaceAll('{{SECTION_EDUCATION}}', 'Education')
      .replaceAll('{{EDUCATION}}', BASE_EDUCATION)
      .replaceAll('{{SECTION_CERTIFICATIONS}}', 'Certifications')
      .replaceAll('{{CERTIFICATIONS}}', BASE_CERTIFICATIONS)
      .replaceAll('{{SECTION_SKILLS}}', 'Skills')
      .replaceAll('{{SKILLS}}', BASE_SKILLS);

    const outDir = resolve(__dirname, 'applications', role.slug);
    const htmlPath = resolve(outDir, 'cv.html');
    const pdfPath = resolve(outDir, 'cv.pdf');

    await writeFile(htmlPath, html);
    console.log(`\n=== ${role.slug} ===`);
    console.log(`Written: cv.html`);

    execSync(
      `node "${resolve(__dirname, 'generate-pdf.mjs')}" "${htmlPath}" "${pdfPath}"`,
      { stdio: 'inherit', cwd: __dirname }
    );
  }

  console.log('\n✅ All tailored CVs generated.');
}

main().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
