const output = document.getElementById('output');
const input = document.getElementById('input');
let currentDir = '~';
let repos = [];

const BACKEND_URL = 'https://your-flask-backend-url-here.com';

fetch('https://api.github.com/users/prithvivasireddy/repos')
    .then(response => response.json())
    .then(data => {
        repos = data;
        appendOutput('Arcane fetch complete: ' + repos.length + ' repositories bound to my will.\n');
    })
    .catch(err => appendOutput('Ether storm: Failed to summon repos. ' + err + '\n'));

const commands = {
    help: () => `
Available incantations:
- about: Reveal my mortal essence
- projects: List my GitHub conquests with detailed scrolls
- resume: Unveil the resume codex
- contact: Summon communication runes
- ls: Peek at current dir contents
- cd [dir]: Traverse the void (e.g., cd projects)
- cat [project]: In projects dir, summon AI-crafted README summary from live GitHub
- clear: Purge the terminal ghosts
- echo [text]: Mirror your madness
    `,
    about: () => `
Prithvi Vasireddy, Data Alchemist & Code Warlock
- Location: United States
- Bio: Intelligence is artificial. Eternal seeker of data truths, weaving intelligence from chaos.
- Expertise: Python, R, SQL, Jupyter, Tableau, Neo4j, PyTorch, BERT Transformers, FastAPI, LangChain, RPA, Intelligent Automation
- Quest: Crafting intelligent systems, from recommendation engines to NoSQL graphs, RPA bots, and Gen-AI solutions.
Type 'projects' to explore my works or 'resume' for the full codex.
    `,
    projects: () => {
        if (repos.length === 0) return 'No repositories divined yet. Patience, mortal.\n';
        let bulletin = '<ul class="bulletin">\n';
        repos.forEach(repo => {
            bulletin += `
<li class="project-item">
    <strong>${repo.name}</strong><br>
    <span class="project-desc">${repo.description || 'No lore inscribed.'}</span><br>
    <span class="project-meta">Language: ${repo.language || 'Unknown'} | Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}</span><br>
    <span class="project-meta">Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span><br>
    <a href="${repo.html_url}" target="_blank" class="project-link">Visit Repository</a>
</li>\n`;
        });
        bulletin += '</ul>\n';
        return 'Portfolio of GitHub Conquests:\n' + bulletin + '\nFeatured Projects (Beyond GitHub):\n- TalentConnect: MERN platform combining LinkedIn networking with Instagram engagement for creatives and recruiters. Features interactive job listings, portfolio sharing, real-time interactions. Hosted on AWS EC2.\n';
    },
    resume: () => `
Resume Codex (Updated August 2025):

- Education:
  - Northeastern University, Boston, MA: MSc in Data Architecture and Management.
    Courses: DAMC7370 Designing Advanced Data Architectures for Business Intelligence, DAMG7250 Big Data Architecture & Governance, DAMG6210 Database Management & Database Design, INFO7374 Algorithmic Marketing, DAMG6105 Data Science Engineering with Python, CSYE6200 Concepts of Object-Oriented Programming & Design, INFO6150 Web Design and User Experience, CSYE7280 User Experience Design and Testing.
  - Jawaharlal Nehru Technological University, India: B.Tech in Computer Science.

- Work Experience:
  - Genuine Parts Company (GPC), Dallas, TX: Full-Stack Developer (Contract), Jun 2024 - Jun 2025.
    - Contributed to platform and technology vision for modernization, reliability, Gen-AI, cloud, and edge computing at Motion Industries and NAPA Auto Parts.
    - Architected deployment/data pipelines for NAPAOnline PROLink and PartsProSE (B2B/B2C apps), restructured monolithic CI/CD to non-monolithic (Groovy), reducing processing time by 70%.
    - Collaborated on analytics modernization for loyalty and marketing.
    - Simplified deployments by decommissioning AzureDevOps, GitLab, Jenkins.
    - Streamlined BI infrastructure with Oracle Fusion, data cleansing, ETL, version control.
    - Configured custom data agents for hybrid environments and omnichannel analytics (Hybris Suite).
    - Used R/Python, SQL, Power BI, Tableau for actionable recommendations.
    - Developed RESTful APIs in Python/FastAPI for RE-Ops backend, integrating with GCP.
    - Designed custom Python logger for RE-Ops.
    - Spearheaded Chat-GPC, proprietary LLM-based AI with LangChain, Pinecone, RAG, prompt chaining.
  - GlaxoSmithKline Pharmaceuticals (GSK), Brussels, Belgium (Remote): Systems Engineer/RPA Developer (Contract), May 2020 - May 2022.
    - Worked in EIA/AI unit for TCS in GSK x UNICEF initiative, developing multi-functional bots and ETL/ELT pipelines for logistics, finance, HR, clinical research, supply chain, pharma inventory.
    - Processed SQL-Server scripts, converted TLFs to dynamic Tableau/PBI visualizations for trend analysis, patient profiling, predictive modeling.
    - Optimized queries in SQL/NoSQL, reducing response times by 30-45% via Snowflake (TPC-DS standards).
    - Authored FDDs/TDDs for business improvements.
    - Mentored 6+ devs/trainees, contributed to R&D in TCS life sciences, aiding Cognix and MFDM solutions.

- Skills: Python, R, SQL, PLSQL, Jupyter, Tableau, Power BI, Neo4j, PyTorch, FastAPI, Golang, LangChain, Pinecone, RAG, Snowflake, SQLAlchemy, RPA (Automation Anywhere), ETL/ELT, CI/CD (Groovy, Jenkins), Cloud (GCP, AWS EC2), Hybris Suite, Oracle Fusion.

- Publications:
  - "An Autonomous Diet Recommendation Bot Using Intelligent Automation" - IEEE, DOI: 10.1109/ICICCS48265.2020.9121120, INSPEC Accession Number: 9711237. Link: https://ieeexplore.ieee.org/document/9121120.

- Achievements:
  - Runner-up at WSIS Forum Hackathon (World Summit on the Information Society) by Global Coalition on Ageing (GCA) with UN. Challenge: Frailty (Bone Frailty). Redesigned SaaS prototype using heuristic bots with reinforcement learning, intelligent automation (IA), and RPA. Certificate: https://drive.google.com/file/d/1TM1Xb7YrPd8MOWnD0q2OD8D3m3BSm63B/view. Forum: https://www.itu.int/net4/wsis/forum/2021/en.
  - Finalist in ML Interpretability Challenge Hackathon at IIT Madras by SoCure Inc. Designed black-box model to predict aberrance in transactional data using Python and R.

- Certifications:
  - Automation Anywhere Certified Advanced RPA Professional - Blockchain ID: 622102.
  - Automation Anywhere Certified RPA Master - Blockchain ID: 661894.

- Featured Projects:
  - TalentConnect: MERN-based platform for creatives and recruiters, with React state management, infinite scrolling, hosted on AWS EC2. Collaborators: Yash Nahata, Anshika Khandelwal.
  - See 'projects' for GitHub repositories.

- References: Available upon request (e.g., Pavan Kumar Autapally, Manoj Dobbala at GPC; Prageet Kumar Dak at TCS).

Download full PDF: [Placeholder for resume PDF link]
    `,
    contact: () => `
Summon Me:
- GitHub: <a href="https://github.com/prithvivasireddy" target="_blank">github.com/prithvivasireddy</a>
- LinkedIn: <a href="https://www.linkedin.com/in/prithvi-vasireddy" target="_blank">linkedin.com/in/prithvi-vasireddy</a>
- Phone: +1-(857) 693-8909
- Email: [Contact via LinkedIn]
    `,
    ls: () => {
        if (currentDir === '~') return 'about\nresume\nprojects\ncontact\n';
        if (currentDir === 'projects') return repos.map(repo => repo.name).join('\n') + '\n';
        return 'Empty void.\n';
    },
    cd: (arg) => {
        if (arg === '..' || arg === '') { currentDir = '~'; return 'Returned to home lair.\n'; }
        if (arg === 'projects') { currentDir = 'projects'; return 'Entered projects realm.\n'; }
        return 'Path not forged: ' + arg + '\n';
    },
    clear: () => { output.innerHTML = ''; return ''; },
    echo: (arg) => arg + '\n',
    cat: async (arg) => {
        if (currentDir !== 'projects') return 'Cat prowls only in projects realm. cd there first, mortal.\n';
        if (!arg) return 'Cat needs prey: cat [project_name]\n';
        
        const repo = repos.find(r => r.name.toLowerCase() === arg.toLowerCase());
        if (!repo) return `No such beast: ${arg}. ls for victims.\n`;
        
        try {
            const response = await fetch(`${BACKEND_URL}/summarize?repo=${encodeURIComponent(repo.name)}`);
            if (!response.ok) throw new Error('Backend abyss rejects: ' + response.status);
            
            const { summary } = await response.json();
            return `AI-Crafted Summary for ${repo.name}:\n\n${summary}\n`;
        } catch (err) {
            return `Ether curse on ${arg}: ${err.message}. Backend offline or README void?\n`;
        }
    }
};

function appendOutput(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        appendOutput(`<span class="prompt">$ ${cmd}</span>\n`);
        processCommand(cmd);
        input.value = '';
    }
});

async function processCommand(cmd) {
    const [base, ...args] = cmd.split(' ');
    const func = commands[base.toLowerCase()];
    if (func) {
        const result = await func(args.join(' '));
        appendOutput(result);
    } else {
        appendOutput(`Command '${base}' not found. Type 'help' for guidance.\n`);
    }
}

appendOutput(`Welcome to Prithvi's Terminal Portfolio v2.2
A digital realm showcasing my data alchemy, code sorcery, and professional achievements.
Type 'help' to begin the ritual.\n`);

document.addEventListener('click', () => input.focus());
