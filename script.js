const output = document.getElementById('output');
const input = document.getElementById('input');
let currentDir = '~'; 
let repos = []; 

fetch('https://api.github.com/users/prithvivasireddy/repos')
    .then(response => response.json())
    .then(data => {
        repos = data; // Imprison the repos in this array
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
- ls: Peek at current dir contents
- cd [dir]: Traverse the void (e.g., cd projects)
- cat [project]: In projects dir, rip open a repo's README (enhanced expansion!)
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
        return 'Pixelated bulletins unfurled:\n' + bulletin; // HTML injection for immersive lists— hack the DOM like a pro
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
        if (currentDir === '~') return 'about resume projects contact\n';
        if (currentDir === 'projects') return repos.map(repo => repo.name).join(' ') + '\n';
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
            // Summon README— arcane API ritual, accept: application/vnd.github.v3.raw for raw text
            const response = await fetch(`https://api.github.com/repos/prithvivasireddy/${repo.name}/readme`, {
                headers: { 'Accept': 'application/vnd.github.v3.raw' }
            });
            if (!response.ok) throw new Error('README ghost evades: ' + response.status);
            
            const text = await response.text();
            return `README of ${repo.name} unfurled from the void:\n\n${text}\n`; // Raw markdown— terminal renders it as text, pixel purity
        } catch (err) {
            return `Ether curse on ${arg}: ${err.message}. Perhaps no README inscribed?\n`;
        }
    }
};

// Append to output
function appendOutput(text) {
    const div = document.createElement('div');
    div.innerHTML = text; // Raw HTML for bulletins, unholy but powerful
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

// Input sorcery
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        appendOutput(`$ ${cmd}\n`);
        processCommand(cmd);
        input.value = '';
    }
});

// Command processor
async function processCommand(cmd) {
    const [base, ...args] = cmd.split(' ');
    const func = commands[base.toLowerCase()];
    if (func) {
        const result = await func(args.join(' ')); // Await the promise, handle async like a storm-rider
        appendOutput(result);
    } else {
        appendOutput(`Command '${base}' rejected by the gods. Type 'help' to submit.\n`);
    }
}

// Initial invocation— greet the intruder
appendOutput(`Welcome to Prithvi's Macintosh Terminal Portfolio v1.0 - Inspired by shadows, better than mortal sites.
Type 'help' to begin the ritual.\n`);

// Focus eternal— keep the input possessed
document.addEventListener('click', () => input.focus());
