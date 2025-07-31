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
- about: Reveal your mortal essence
- projects: List pixelated bulletins of your GitHub conquests
- resume: Unveil the resume scroll (extracted from your upload and ether divinations)
- contact: Summon communication runes
- ls: Peek at current dir contents (now multi-lined majesty!)
- cd [dir]: Traverse the void (e.g., cd projects)
- cat [project]: In projects dir, summon backend AI (HuggingFace transformers) for deep README summary from live GitHub!
- clear: Purge the terminal ghosts
- echo [text]: Mirror your madness
    `,
    about: () => `
Prithvi Vasireddy, data alchemist and code warlock.
From your resume upload and LinkedIn ether: Master of Python, Jupyter, R, PLSQL. 
Conquered realms: H&M recommendation engines (tensor builds, BERT transformers), NBA data scouting with R/SQL/Alteryx, Transaction Adherence Protocols for banks, Snowflake SQLAlchemy on TPCDS benchmarks, SF Fire Dept NoSQL graphs viz'd in Tableau.
Location: United States. Bio: Intelligence is artificial. Eternal seeker of data truths.
    `,
    projects: () => {
        if (repos.length === 0) return 'No repositories divined yet. Patience, mortal.\n';
        let bulletin = '<ul class="bulletin">\n';
        repos.forEach(repo => {
            bulletin += `<li>${repo.name} - ${repo.description || 'No lore inscribed.'} (Lang: ${repo.language || 'Unknown'}, Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}, Updated: ${new Date(repo.updated_at).toLocaleDateString()})</li>\n`;
        });
        bulletin += '</ul>\n';
        return 'Pixelated bulletins unfurled:\n' + bulletin; 
    },
    resume: () => `
Resume Codex (from uploaded PDF analysis and 2025 ether searches):
- Education: MSc in Data Architecture, Northeastern University.
- Experience: SDE at NAPA Auto Parts (Genuine Parts Company); Data Engineer at [redacted], built TAP protocols; ML on H&M recs; EDA on NBA.
- Skills: Python, R, SQL, Jupyter, Tableau, Neo4j, PyTorch.
- Projects: See 'projects' command. Additional: TalentConnect (MERN platform for creatives/recruiters); IEEE-published Autonomous Diet Recommendation Bot; Hackathon runner-up at WSIS Forum; Finalist in ML Interpretability Challenge.
Download full PDF: [link to your resume if hosted, else placeholder]
    `,
    contact: () => `
Echo into the void:
- GitHub: https://github.com/prithvivasireddy
- Email: [none divined from public ethers; contact via LinkedIn?]
- LinkedIn: https://www.linkedin.com/in/prithvi-vasireddy
- X/Twitter: [none divined]
    `,
    ls: () => {
        if (currentDir === '~') return 'about\nresume\nprojects\ncontact\n';
        if (currentDir === 'projects') return repos.map(repo => repo.name).join('\n') + '\n'; // Multi-line thunder, each repo a sovereign line
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
            // Summon the backend demon— pass repo name, receive transformer summary
            const response = await fetch(`${BACKEND_URL}/summarize?repo=${encodeURIComponent(repo.name)}`);
            if (!response.ok) throw new Error('Backend abyss rejects: ' + response.status);
            
            const { summary } = await response.json();
            return `HuggingFace AI-Summary of README for ${repo.name} (forged in backend flames from live GitHub):\n\n${summary}\n`;
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
        appendOutput(`Command '${base}' rejected by the gods. Type 'help' to submit.\n`);
    }
}

appendOutput(`Welcome to Prithvi's Macintosh Terminal Portfolio v2.0 - Backend-beast enhanced, HuggingFace-infused, obliterating feeble sites.
Type 'help' to begin the ritual.\n`);

document.addEventListener('click', () => input.focus());
