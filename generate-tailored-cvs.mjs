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
    // Block E: "Senior practitioner in discovery-to-delivery cycles..."
    // Keywords: professional services, SOW, DevSecOps, discovery, pre-sales, trusted advisor
    slug: '008-gitlab-engagement-manager-emea',
    summary: 'Senior practitioner in discovery-to-delivery cycles -- structured complex programs for universities, labs, and funded initiatives. Now applying that operating model to enterprise PS engagements. 15+ years bridging technical delivery and stakeholder alignment; managed EUR 2M in funded project portfolios. DevOps-native: Docker, Kubernetes, CI/CD, GitHub -- fluent in GitLab\'s product domain.',
    competencies: [
      'Professional Services Delivery', 'SOW & Staffing Plans', 'Discovery & Pre-Sales',
      'Trusted Advisor', 'Stakeholder Management', 'Executive Communication',
      'CI/CD & DevSecOps', 'GitLab Platform', 'EMEA Remote Delivery',
      'Implementation Roadmap',
    ],
    projects: P_VCH + P_2BSMART + P_INTERACTIVE + P_BEERGAME,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "Technical Program Manager with 10+ years running cross-functional initiatives..."
    // Keywords: Staff TPM, cross-functional, CI/CD, distributed systems, dependency management
    slug: '009-gitlab-staff-tpm',
    summary: 'Technical Program Manager with 10+ years running cross-functional initiatives in distributed environments -- from 8-course university merges to cross-European AI compliance labs. Deep DevOps fluency; operates comfortably at the intersection of technical architecture and organizational delivery. Dependency mapping, sprint design, and stakeholder alignment across ambiguous, multi-workstream programs.',
    competencies: [
      'Technical Program Management', 'Cross-functional Coordination', 'Dependency Management',
      'CI/CD & Cloud Infrastructure', 'Distributed Systems Delivery', 'Program Portfolio',
      'Engineering Leadership', 'Risk Management', 'Async Remote Collaboration',
      'Staff TPM Level',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "AI Transformation practitioner -- I design the environments..."
    // Keywords: AI transformation, champion network, n8n, Flowise, community of practice, agent building
    slug: '010-gitlab-ai-transformation-owner',
    summary: 'AI Transformation practitioner -- I design the environments where organizations adopt new capabilities. Built 5+ innovation labs. Deployed AI stacks from scratch: n8n, Flowise, OpenWebUI, Supabase. Run champion networks across open-source ecosystems and research institutions. Applied in education, supply chain, and blockchain. Marketing is next.',
    competencies: [
      'AI Transformation', 'Change Management & Adoption', 'Champion Network Building',
      'n8n & Flowise Deployment', 'No-Code / Low-Code Agents', 'Community of Practice',
      'Marketing Operations AI', 'KPI & Performance Tracking', 'Agent Fleet Management',
      'Enterprise AI Rollout',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_MAGICFRAMES,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "Designed and delivered simulation-based and game-based learning experiences..."
    // Keywords: LXD, ADDIE, Articulate 360, eLearning, adult learning theory, LMS/LXP
    slug: '011-adyen-learning-experience-design-pm',
    summary: 'Designed and delivered simulation-based and game-based learning experiences across university, fintech training, and supply chain contexts. Bachelor thesis (grade 8.7) on simulation-based training methodology. ADDIE-adjacent practitioner: needs assessment, design, build, delivery, and iteration. 10+ courses still in active independent use. Articulate 360 named as gap; fast learner with existing authoring tool experience.',
    competencies: [
      'Learning Experience Design', 'ADDIE Methodology', 'Simulation-based Learning',
      'Game-based Education', 'LMS / LXP Management', 'Content Development',
      'Adult Learning Theory', 'AI-driven Content', 'Authoring Tools',
      'L&D Program Management',
    ],
    projects: P_2BSMART + P_BEERGAME + P_MAGICFRAMES + P_VCH,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "Built and led learning organizations across university and tech contexts..."
    // Keywords: L&D strategy, team lead, North Star vision, learning at scale, communities of practice
    slug: '012-adyen-team-lead-ld',
    summary: 'Built and led learning organizations across university and tech contexts -- from designing the learning architecture to running the teams that deliver it. Spark! Living Lab: still running 5 years on. Implemented school-wide Scrum at Aeres Hogeschool in under 2 months. North Star vision, then the building -- both parts of the job. 15+ years as agile practitioner and programme leader.',
    competencies: [
      'L&D Strategy & Team Leadership', 'Learning Ecosystem Design', 'North Star Vision',
      'Learning at Scale', 'Stakeholder Influence', 'Modern Learning Technologies',
      'AI Applications in L&D', 'Communities of Practice', 'Coaching & Mentorship',
      'Programme Leadership',
    ],
    projects: P_2BSMART + P_BEERGAME + P_MAGICFRAMES + P_VCH,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "Innovation builder with supply chain and AI transformation track record..."
    // Keywords: Retail & CPG, 0-to-1, Value Engineering, process intelligence, go-to-market
    slug: '017-celonis-head-of-industry-retail-cpg',
    summary: 'Innovation builder with supply chain and AI transformation track record. Built 5 industry labs from zero; now looking to apply that model at enterprise scale in Retail & CPG. Value Chain Hackers: AI-powered CSRD/EUDR compliance and traceability tooling live at valuechainhackers.xyz -- built with cross-European research and student team. Process intelligence for supply chain is the current domain.',
    competencies: [
      'Supply Chain Innovation', 'Retail & CPG Domain', '0-to-1 Practice Building',
      'Value Engineering', 'Go-to-Market Strategy', 'Process Intelligence',
      'Partner Enablement', 'Thought Leadership', 'CSRD / EUDR Compliance',
      'Team Building at Scale',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_FARMCREDIBLY,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    // Block E: "Applied AI architect with a track record of deploying AI tools..."
    // Keywords: Applied AI Architect, LLM, evaluation frameworks, Claude API, AI adoption, DACH
    slug: '020-anthropic-applied-ai-architect',
    summary: 'Applied AI architect with a track record of deploying AI tools, teaching LLM adoption, and translating complex systems for enterprise audiences. Deployed enterprise BI systems for BP and Statoil at KONGSBERG: full lifecycle from hardware to training. Designed and operated self-managed LLM environment (OpenWebUI, Flowise, n8n, Supabase on Linux) for 50+ university researchers -- from architecture to adoption.',
    competencies: [
      'Applied AI Architecture', 'LLM Deployment & Advisory', 'Technical Pre-Sales',
      'Evaluation Frameworks', 'Claude & Claude API', 'Enterprise AI Adoption',
      'Workshop Facilitation', 'DACH Market', 'Stakeholder Communication',
      'Cloud Architecture',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    // Block E: "product owner of AI infrastructure for student and researcher experimentation"
    // Keywords: Product Manager, AI, open source, Ubuntu, Linux, product lifecycle, go-to-market
    slug: '021-canonical-pm-ai',
    summary: 'Product manager by practice: product owner of AI infrastructure for student and researcher experimentation at Windesheim; co-defined product vision for Pangea Vault at Tonomy Foundation; built Spark! Living Lab roadmap across 5 years. Ubuntu Linux and open-source infrastructure are the home domain -- runs production stacks daily. Go-to-market and market research experience across education, supply chain, and blockchain.',
    competencies: [
      'Product Management', 'AI Research Platform Ownership', 'Open Source & Ubuntu',
      'Product Lifecycle', 'Market Research & GTM', 'Cloud-native Platforms',
      'Distributed Team Leadership', 'Stakeholder Alignment', 'Canonical Ecosystem',
      'Linux DevOps',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_INTERACTIVE,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    // Block E: "built software ecosystems and enablement programs adopted independently"
    // Keywords: software alliance, ISV, partner enablement, Ubuntu adoption, reference architectures
    slug: '023-canonical-software-alliance-ecosystem',
    summary: 'Software ecosystem builder who has built enablement programs adopted by partners and institutions independently. Co-built the Tonomy open-source ecosystem (W3C DID working group, whitepaper as GTM anchor); developed Open Food Chain partner network; created HTC tutorial content adopted globally. 10+ years DevOps on Ubuntu-based Linux infrastructure. ISV and alliance management in practice.',
    competencies: [
      'Software Ecosystem Building', 'Ubuntu Linux DevOps', 'Partner Enablement',
      'ISV Alliance Management', 'Open Source Governance', 'Reference Architectures',
      'Enablement Content at Scale', 'Ubuntu Adoption Campaigns', 'Business Development',
      'Technology Strategy',
    ],
    projects: P_VCH + P_2BSMART + P_INTERACTIVE + P_BEERGAME,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    // Block E: "applied data and AI practitioner, deployed AI infrastructure..."
    // Keywords: engagement manager, Data & AI, DACH, trusted advisor, services attach, platform adoption
    slug: '025-databricks-sr-engagement-manager-munich',
    summary: 'Trusted advisor and applied data and AI practitioner -- deployed AI infrastructure across research and educational contexts. Delivered enterprise BI systems for BP and Statoil at KONGSBERG: field delivery, architecture-level discussions, executive sign-off. Designed self-hosted AI delivery environment (Flowise, OpenWebUI, n8n, Supabase) for 50+ researchers. Currently working with Viridis Green-Tech in Munich -- direct DACH market and German working context.',
    competencies: [
      'Professional Services Leadership', 'Trusted Advisor', 'Data & AI Platform',
      'DACH Market', 'Executive Advisory', 'Program Management',
      'Services Attach', 'Platform Adoption', 'GSI Partner Collaboration',
      'Architecture-level Engagement',
    ],
    projects: P_VCH + P_INTERACTIVE + P_2BSMART + P_ESIEA,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "I build AI-powered systems for real users and teach teams how to use them."
    // Keywords: n8n, HITL, workflow automation, open-source, RAG, agent workflows, production AI, 0-to-1
    slug: '028-n8n-ai-product-builder',
    summary: 'I build AI-powered systems for real users and teach teams how to use them. I run n8n in production for university research infrastructure: compliance checking, research onboarding, agent routing. Built 5 innovation labs and incubated 10 ventures from concept to working product. 0-to-1 product ownership is the documented pattern. Demo what runs in production -- not polished prototypes.',
    competencies: [
      'n8n Production Workflows', 'AI Product Building', 'Human-in-the-Loop Systems',
      'Workflow Automation', 'Open-source AI Stack', 'RAG & Agent Workflows',
      '0-to-1 Product Ownership', 'Production AI Observability', 'AI-native Product Management',
      'Remote-first Europe',
    ],
    projects: P_VCH + P_BEERGAME + P_2BSMART + P_MAGICFRAMES,
    portfolio_url: 'https://valuechainhackers.xyz',
    portfolio_display: 'valuechainhackers.xyz',
  },
  {
    // Block E: "Certified in Prince2, ITIL, Scrum, and PSPO I -- applied across complex multi-stakeholder programs"
    // Keywords: program manager, professional services, RACI, OKR, DevSecOps, GitLab, Prince2, ITIL
    slug: '029-gitlab-program-manager-london',
    summary: 'Program manager certified in Prince2, ITIL, Scrum Master, and PSPO I -- applied across complex multi-stakeholder programs from university transformation to cross-European research initiatives. Delivered enterprise client implementations for BP and Statoil at KONGSBERG across Jordan, Oman, and Azerbaijan. DevOps background native to the GitLab domain: Docker, Kubernetes, CI/CD -- operated daily for 10+ years.',
    competencies: [
      'Program Management', 'Prince2 & ITIL', 'Scrum Master & PSPO I',
      'Multi-workstream Delivery', 'Customer-facing Delivery', 'DevSecOps & GitLab',
      'RACI & OKR', 'Stakeholder Management', 'Budget Management',
      'Program Strategy',
    ],
    projects: P_VCH + P_2BSMART + P_INTERACTIVE + P_BEERGAME,
    portfolio_url: 'https://socialchicken.net',
    portfolio_display: 'socialchicken.net',
  },
  {
    // Block E: "Built AI-powered intake and workflow automation systems on n8n..."
    // Keywords: intake management, portfolio management, triage, n8n, OKR, capacity planning
    slug: '030-stripe-pm-intake-portfolio',
    summary: 'Program manager and systems builder. Built AI-powered intake and workflow automation systems on n8n for research programs; designed portfolio management processes for cross-departmental initiatives. Managed 8-workstream COVID-19 portfolio under pandemic constraints: dependency graph from scratch, weekly reviews, mid-flight model rebuild, full on-schedule delivery. Prince2, ITIL, Scrum, PSPO I -- methodology depth makes delivery reliable.',
    competencies: [
      'Portfolio Management', 'AI-powered Intake (n8n)', 'Triage & Prioritization',
      'Workflow Automation', 'Capacity Planning', 'OKR & Dashboard',
      'Change Management', 'Stakeholder Management', 'Systems Thinking',
      'Portfolio Visibility',
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
