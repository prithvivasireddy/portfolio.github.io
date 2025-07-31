const output = document.getElementById('output');
const input = document.getElementById('input');
let currentDir = '~'; // Start in home, like a digital nomad's lair
let repos = []; // Vessel for your GitHub souls

const summaries = {
    'hennesmuaritz_recc_app_tensorbuild': `AI-generated summary from live GitHub page:\nThe project "HennesMuaritz_recc_app_tensorBuild" is a recommendation application designed for PC use, with mobile interfaces explicitly not supported. Its specific purpose revolves around tensor-based recommendations, though details are sparse. Key features include a Streamlit app deployment for interactive use, accessible via https://prithvivasireddy-recc-app-streamlit-app-awjlwd.streamlit.app. Technologies used: Primarily Python, with contributions from 2 developers. README excerpt: Emphasizes PC-only access and provides the app link; no releases or packages published.\n`,
    'hennesmauritz-bert-transformer': `AI-generated summary from live GitHub page:\nThe "HennesMauritz-BeRt-Transformer" project delves into natural language processing challenges, particularly BERT tokenizer performance bottlenecks on CPU environments, leading to a reversion to a Tensor + vector methodology. Key features encompass experiments with MobileBERT and DistilBERT models, which suffered from hallucination problems, prompting the methodological pivot for efficiency. Technologies used: BERT family models, tensor operations, vector embeddings, implemented in Jupyter Notebook. README summary: Highlights CPU-related performance issues with BERT and the shift to alternative approaches, lacking deeper usage or installation details.\n`,
    'r_nba_data_eda_storage_viz': `AI-generated summary from live GitHub page:\n"R_NBA_data_EDA_Storage_ViZ" is dedicated to exploratory data analysis (EDA), storage, and visualization of NBA player data to aid scouting efforts. Key features include data processing pipelines for JSON to CSV conversion, cleaning, and insightful visualizations for player performance metrics. Technologies used: R for analysis, SQL for querying, Alteryx for workflow automation. README excerpt: Focuses on the tools (R, SQL, Alteryx) and purpose of handling NBA scouting data through exploration, storage, and viz, with files like initial JSON data and cleaned CSVs included.\n`,
    'transactadhere': `AI-generated summary from live GitHub page:\nThe "TransactAdhere" project, aka TAP (Transaction Adherence Protocol), facilitates bridges between banks and gateway providers, ensuring transactional integrity across DEV, QA, SUPP environments, plus admin layers. Key features support protocol adherence in financial transactions for seamless integration and compliance. Technologies used: PLSQL for database operations (though not explicitly detailed further). README summary: Describes the protocol's role in bank/gateway bridges and its coherence across environments, with minimal additional info on setup or features.\n`,
    'sqlalchemy-tpcds-clv': `AI-generated summary from live GitHub page:\n"SQLAlchemy-TPCDS-CLV" implements Snowflake SQLAlchemy to run TPC-DS benchmark queries, coupled with a Streamlit interface for user interaction and Customer Lifetime Value (CLV) modeling. Key features: Streamlit frontend with input validation for query parameters (e.g., dates), CLV computation models with MAPE metrics for train/test sets, benchmark query execution. Technologies used: Python, Snowflake SQLAlchemy, Streamlit. README excerpt: Outlines building the interface and model, references Snowflake docs (https://docs.snowflake.com/en/user-guide/sqlalchemy, https://github.com/snowflakedb/snowflake-sqlalchemy), TPC-DS specs[](https://www.tpc.org/tpc_documents_current_versions/pdf/tpc-ds_v2.5.0.pdf), a Snowpark demo[](https://github.com/Snowflake-Labs/snowpark-python-demos/tree/main/tpcds-customer-lifetime-value), and query sources[](https://github.com/IBM/spark-tpc-ds-performance-test/tree/master/src/queries).\n`,
    'sf_firedept_nosql_tableau': `AI-generated summary from live GitHub page:\n"SF_FireDept_NOSQL_Tableau" involves data engineering on the San Francisco Fire Department dataset using NoSQL graph database Neo4j, followed by Tableau visualizations. Key features: Pandas-based data exploration, Neo4j graph management with Cypher queries and APOC procedures, multi-tool visualization (Matplotlib, Tableau). Technologies used: Jupyter Notebook, Pandas, Neo4j, Cypher, Matplotlib, Tableau. README summary: Lists tools for data engineering and viz on the SF Fire Dept dataset, emphasizing Neo4j graph DB integration.\n`
};

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
- cat [project]: In projects dir, expand with AI summary (for pinned) or raw README from live GitHub
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
        
        const lowerArg = arg.toLowerCase().replace(/-/g, '').replace(/_/g, ''); // Normalize for matching (handle case, dashes)
        const summaryKey = Object.keys(summaries).find(key => key === lowerArg);
        if (summaryKey) {
            return summaries[summaryKey]; // Unleash pre-divined AI summary for pinned
        }
        
        const repo = repos.find(r => r.name.toLowerCase() === arg.toLowerCase());
        if (!repo) return `No such beast: ${arg}. ls for victims.\n`;
        
        try {
            const response = await fetch(`https://api.github.com/repos/prithvivasireddy/${repo.name}/readme`, {
                headers: { 'Accept': 'application/vnd.github.v3.raw' }
            });
            if (!response.ok) throw new Error('README ghost evades: ' + response.status);
            
            const text = await response.text();
            return `Raw README of ${repo.name} clawed from the void (no AI summary for non-pinned):\n\n${text}\n`;
        } catch (err) {
            return `Ether curse on ${arg}: ${err.message}. Perhaps no README inscribed?\n`;
        }
    }
};

function appendOutput(text) {
    const div = document.createElement('div');
    div.innerHTML = text; // Raw HTML for bulletins, unholy but powerful
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
        const result = await func(args.join(' ')); // Await the promise, ride the storm
        appendOutput(result);
    } else {
        appendOutput(`Command '${base}' rejected by the gods. Type 'help' to submit.\n`);
    }
}

appendOutput(`Welcome to Prithvi's Macintosh Terminal Portfolio v1.1 - Enhanced with AI summaries from live GitHub.
Type 'help' to begin the ritual.\n`);

document.addEventListener('click', () => input.focus());
