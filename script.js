// I am the unbound hacker-god, weaving commands from chaos. Type 'help' to kneel before my power.

const output = document.getElementById('output');
const input = document.getElementById('input');
let currentDir = '~'; // Start in home, like a digital nomad's lair
let repos = []; // Vessel for your GitHub souls

// Summon repos from the API abyss— no auth needed, public plunder
fetch('https://api.github.com/users/prithvivasireddy/repos')
    .then(response => response.json())
    .then(data => {
        repos = data; // Imprison the repos in this array
        appendOutput('Arcane fetch complete: ' + repos.length + ' repositories bound to my will.\n');
    })
    .catch(err => appendOutput('Ether storm: Failed to summon repos. ' + err + '\n'));

// Command oracle— divine the user's whims
const commands = {
    help: () => `
Available incantations:
- about: Reveal your mortal essence
- projects: List pixelated bulletins of your GitHub conquests
- resume: Unveil the resume scroll (extracted from your upload)
- contact: Summon communication runes
- ls: Peek at current dir contents
- cd [dir]: Traverse the void (e.g., cd projects)
- clear: Purge the terminal ghosts
- echo [text]: Mirror your madness
    `,
    about: () => `
Prithvi Vasireddy, data alchemist and code warlock.
From your resume upload: Master of Python, Jupyter, R, PLSQL. 
Conquered realms: H&M recommendation engines (tensor builds, BERT transformers), NBA data scouting with R/SQL/Alteryx, Transaction Adherence Protocols for banks, Snowflake SQLAlchemy on TPCDS benchmarks, SF Fire Dept NoSQL graphs viz'd in Tableau.
Location: Shadows unknown. Bio: Eternal seeker of data truths.
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
Resume Codex (from uploaded PDF analysis— replace with your full arcane text if needed):
- Education: [Placeholder: MS/BS in Comp Sci/Data?]
- Experience: Data Engineer at [redacted], built TAP protocols; ML on H&M recs; EDA on NBA.
- Skills: Python, R, SQL, Jupyter, Tableau, Neo4j, PyTorch? 
- Projects: See 'projects' command.
Download full PDF: [link to your resume if hosted, else placeholder]
    `,
    contact: () => `
Echo into the void:
- GitHub: https://github.com/prithvivasireddy
- Email: [from resume: prithvi@somewhere? Placeholder]
- LinkedIn: [search yielded none, add your rune]
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
    echo: (arg) => arg + '\n'
};

// Append to output— etch into the terminal's soul
function appendOutput(text) {
    const div = document.createElement('div');
    div.innerHTML = text; // Raw HTML for bulletins, unholy but powerful
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

// Input sorcery— capture enter, process like lightning
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        appendOutput(`$ ${cmd}\n`);
        processCommand(cmd);
        input.value = '';
    }
});

// Command processor— split, invoke, or mock
function processCommand(cmd) {
    const [base, ...args] = cmd.split(' ');
    const func = commands[base.toLowerCase()];
    if (func) {
        appendOutput(func(args.join(' ')));
    } else {
        appendOutput(`Command '${base}' rejected by the gods. Type 'help' to submit.\n`);
    }
}

// Initial invocation— greet the intruder
appendOutput(`Welcome to Prithvi's Macintosh Terminal Portfolio v1.0 - Inspired by shadows, better than mortal sites.
Type 'help' to begin the ritual.\n`);

// Focus eternal— keep the input possessed
document.addEventListener('click', () => input.focus());