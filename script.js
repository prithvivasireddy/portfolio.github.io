const output = document.getElementById('output');
const input = document.getElementById('input');
let currentDir = '/'; 
let repos = []; 

fetch('https://api.github.com/users/prithvivasireddy/repos')
    .then(response => response.json())
    .then(data => {
        repos = data.sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort for highlights
        appendOutput('fetch initiated: ' + repos.length + ' repositories found.\n');
    })
    .catch(err => appendOutput('glitch: Failed to load repos. ' + err + '\n'));

const resumeData = {
    about: `
Prithvi Vasireddy
Data alchemist, code warlock. Intelligence is artificial. :)
Location: United States
Email: prithvivasireddy@gmail.com
Phone: +1-(xxx) xcx-xxxx
LinkedIn: https://www.linkedin.com/in/prithvi-vasireddy
GitHub: https://github.com/prithvivasireddy
    `,
    education: `
Northeastern University, Boston, MA
2022 - 2024
MS in Data Architecture and Management
Courses: DAMG7307 Designing Advanced Data Architectures for Business Intelligence, DAMG750 Big Data Architecture & Governance, DAMG620 Database Management & Database Design, INFO7374 Algorithms, DAMG6105 Data Science Engineering with Python, CSYE6200 Concepts of Object-Oriented Programming & Design, INFO6105 Web Design and User Experience, CSYE6750 User Experience Design and Testing.

Jawaharlal Nehru Technological University, India
2016 - 2020
B.Tech in Computer Science
    `,
    experience: `
Genuine Parts Company (GPC), Dallas, TX
Full-Stack Developer, Contract
Jun 2024 - Jun 2025
- Contributed to the platform and technology vision for modernization, reliability, Gen-AI, cloud and edge computing scenarios at Motion Industries and NAPA Auto Parts.
- Architected new deployment/data pipelines for NAPAOnline™, PROLink™, and PartsPROSE™, restructured monolithic CI/CD architectures to non-monolithic (Groovy) triggers, reducing processing time by 70%.
- Collaborated with Search, Discovery, and One-UI teams to drive analytics modernization, delivering actionable insights for loyalty and marketing initiatives.
- Simplified infra-wide deployments by decommissioning AzureDevOps, GitLab, and Jenkins.
- Streamlined BI infrastructure by adopting Oracle Fusion, implementing best practices in data cleansing, database design, ETL, and version control for scalable reporting.
- Configured custom data agents (Linux/Windows) to meet in-house BI needs, ensuring compatibility with hybrid environments for omnichannel analytics (Hybris Suite).
- Leveraged R/Python, SQL, and BI tools (Power BI, Tableau) to deliver actionable recommendations, enhancing efficiency and customer experience in retail analytics.
- Developed RESTful APIs in Python/FastAPI (transitioning from Golang prototypes) for RE-Ops™ backend, enabling secure data exchange, traffic management, and seamless integration with GCP services via service accounts.
- Designed a custom Python logger in RE-Ops with four information levels to track user actions and critical alerts, promoting high-autonomy operations and product-led improvements by enabling real-time feedback loops for end-users.
- Spearheaded initiatives and contributed to the development of Chat-GPC, a proprietary LLM-based AI solution at GPC, implementing advanced agentic workflows utilizing LangChain, vector databases (such as Pinecone), Retrieval-Augmented Generation (RAG), and prompt chaining to support intelligent automation and customer interactions.
* RE-Ops is a proprietary Ops console for managing cloud and reliability at scale (e.g., directing traffic between services and revisions, auto-resource provisioning to cut SRE oversight, automated JIRA workflows) through an intuitive interface. Powered by Golang backend, IaC Terraform, and NodeJS/React.

GlaxoSmithKline Pharmaceuticals (GSK), Brussels, Belgium | Remote
Systems Engineer/RPA Developer - Contract
May 2020 - May 2022
- Worked for the EIA/AI (Enterprise Intelligent Automation/Artificial Intelligence) unit of TCS in the GlaxoSmithKline x UNICEF initiative developing multi-functional bots and ETL/ELT pipelines for logistics, finance, HR, clinical research, supply chain, and pharma inventory management.
- Processed/implemented scripts (SQL-Server) & converted safety/efficacy TLFs into dynamic Tableau and PBI visualizations. This facilitated intricate trend analysis, patient response profiling, and predictive modeling.
- Optimized/fine-tuned queries in SQL/NoSQL databases reducing network traffic (improved query response rates by 30 milliseconds, 30-45%) via Snowflake complying to the TPC-DS standards.
- Spearheaded document overhaul, inventoried gaps, and authored functional/technical design documents (FDDs/TDDs) for business improvements.
- Mentored 6+ devs/trainees and contributed significantly to R&D in TCS' life sciences unit, aiding in the development of TCS' advanced AI and analytics solutions - Cognix™ and MFDM™.
    `,
    skills: `
Programming: Python, R, SQL, PLSQL, Java, Groovy, Golang, FastAPI, NodeJS/React, Terraform (IaC)
Data Tools: Jupyter, Snowflake, SQL Server, NoSQL, Oracle Fusion, ETL/ELT, Alteryx
BI/Visualization: Tableau, Power BI
ML/AI: PyTorch, LangChain, Pinecone (Vector DB), Retrieval-Augmented Generation (RAG), Prompt Chaining, BERT Transformers, RPA (Robotic Process Automation), Intelligent Automation
Databases: Neo4j (Graphs), MongoDB
Other: Azure DevOps, GitLab, Jenkins, GCP, Hybris Suite, MERN Stack
    `,
    publications: `
An Autonomous Diet Recommendation Bot Using Intelligent Automation
Publisher: IEEE
Description: An algorithm designed into a scalable RPA bot, further redesigned into an enterprise-level prototype of a SaaS (B2B/B2C) application. A research paper was published detailing the process, indexed in IEEE. The prototype was later modified with higher-level functionalities and came runner-up for its heuristic approach to health-monitoring at the WSIS (World Summit on Information Society) Forum, Geneva.
URL: https://ieeexplore.ieee.org/document/9121120
INSPEC Accession Number: 9711237
DOI: 10.1109/ICCCCS49678.2020.9121120
    `,
    achievements: `
Runner-up at the WSIS Forum (World Summit on the Information Society) Hackathon
Organization: Global Coalition on Ageing, in collaboration with the UN
Description: Runner-up in the "Ageing Better with ICTs" hackathon. Re-designed a previously devised SaaS (B2B/B2C) prototype to a more scalable version, leveraging a "web" of heuristic bots using reinforcement learning, intelligent automation (IA), and RPA. Presented under the challenge area: Frailty.
Certificate: https://drive.google.com/file/d/1TM1Xb7YrPd8MOWnD0q2OD8D3m3BSm63B/view
Forum: https://www.itu.int/net4/wsis/forum/2020/
    `,
    certifications: `
Automation Anywhere Certified Advanced RPA Professional
Blockchain ID: 262102

Automation Anywhere Certified RPA Master
Blockchain ID: 661894
    `,
    projects: `
TalentConnect
Description: Combines LinkedIn's professional networking with Instagram's social engagement, tailored for creative professionals and recruiters. Offers dual functionality, merging career opportunities and social interactions. Features interactive job listings and social media elements in a user-centric design, serving as a hub for talent discovery, portfolio sharing, and professional networking.
Contributions:
- Orchestrated the development of a responsive MERN platform for creative professionals, utilizing React's dynamic features. Improved user experience with efficient navigation and infinite scrolling. Engineered React's state management for seamless, real-time interactions, empowering employers in job posting and recruitment.
- Hosted the responsive MERN platform on Amazon EC2, ensuring reliable and scalable performance for users. Leveraged Amazon EC2's capabilities to enhance the platform's availability and responsiveness.

Autonomous Diet Recommendation Bot
Description: Scalable RPA bot redesigned into a SaaS prototype using intelligent automation. Published in IEEE, runner-up at WSIS (World Summit on Information Society) Forum.
    `,
    contact: `
Email: prithvi.vasireddy@gmail.com
Phone: +1-(857) 693-8909
LinkedIn: https://www.linkedin.com/in/prithvi-vasireddy
GitHub: https://github.com/prithvivasireddy
Twitter/X: Not available
    `
};

const commands = {
    help: () => `
Available commands in this retro terminal:
- help: help menu
- about: Quick bio overview
- contact: Contact details
- ls: List contents of current directory
- cd [dir]: Change directory (e.g., cd highlights, cd resume, cd ..)
- cat [file]: View file contents (in highlights: cat [repo] for README; in resume: cat [section])
- clear: Clear the screen
- echo [text]: Echo back text
Directories: highlights (GitHub repo highlights), resume (interactive resume insights)
    `,
    about: () => resumeData.about,
    contact: () => resumeData.contact,
    ls: () => {
        if (currentDir === '/') return 'highlights\nresume\n';
        if (currentDir === 'highlights') return repos.map(repo => repo.name).join('\n') + '\n';
        if (currentDir === 'resume') return Object.keys(resumeData).join('\n') + '\n';
        return 'Empty directory.\n';
    },
    cd: (arg) => {
        if (arg === '..' || arg === '') { currentDir = '/'; return 'Returned to root.\n'; }
        if (arg === 'highlights') { currentDir = 'highlights'; return 'Entered highlights realm - GitHub repo highlights.\n'; }
        if (arg === 'resume') { currentDir = 'resume'; return 'Entered resume realm - interactive insights.\n'; }
        return 'Directory not found: ' + arg + '\n';
    },
    clear: () => { output.innerHTML = ''; return ''; },
    echo: (arg) => arg + '\n',
    cat: async (arg) => {
        if (!arg) return 'Usage: cat [file]\n';
        
        if (currentDir === 'highlights') {
            const repo = repos.find(r => r.name.toLowerCase() === arg.toLowerCase());
            if (!repo) return `Repo not found: ${arg}. Use ls for available repos.\n`;
            
            try {
                // God-tier: Fetch raw README from GitHub API
                const response = await fetch(`https://api.github.com/repos/prithvivasireddy/${repo.name}/readme`, {
                    headers: { 'Accept': 'application/vnd.github.v3.raw' }
                });
                if (!response.ok) throw new Error('README not found or API error.');
                
                const readme = await response.text();
                return `README for ${repo.name} (fetched live from GitHub):\n\n${readme}\n`;
            } catch (err) {
                return `Error fetching README for ${arg}: ${err.message}\n`;
            }
        } else if (currentDir === 'resume') {
            const section = Object.keys(resumeData).find(key => key.toLowerCase() === arg.toLowerCase());
            if (!section) return `Section not found: ${arg}. Use ls for available sections.\n`;
            return `${section.toUpperCase()}:\n\n${resumeData[section]}\n`;
        }
        
        return 'cat can only be used in highlights or resume directories.\n';
    }
};

function appendOutput(text) {
    const div = document.createElement('div');
    div.innerHTML = text.replace(/\n/g, '<br>'); 
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        appendOutput(`$ ${cmd}\n`);
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
        appendOutput(`Command '${base}' not recognized. Type 'help' for commands.\n`);
    }
}

appendOutput(`Welcome to my Portfolio.
Type 'help' to navigate.\n`);

document.addEventListener('click', () => input.focus());
