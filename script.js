body {
    background-color: #f5f5f5; /* Soft white for a modern terminal vibe */
    color: #1a1a1a; /* Deep charcoal for readability */
    font-family: 'VT323', monospace;
    font-size: 22px;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#terminal {
    width: 85vw;
    height: 85vh;
    background-color: #ffffff;
    border: 3px solid #1a1a1a;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 25px;
    overflow-y: auto;
    border-radius: 8px; /* Subtle rounding for polish */
}

#output {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.4;
}

#input-line {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

#prompt {
    color: #0066cc; /* Blue prompt for emphasis */
    margin-right: 8px;
    font-weight: bold;
}

#input {
    background: none;
    border: none;
    color: #1a1a1a;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    flex-grow: 1;
    caret-color: transparent;
}

#input-line::after {
    content: '█';
    color: #0066cc;
    animation: blink 0.8s step-end infinite;
    margin-left: 3px;
}

@keyframes blink {
    50% { opacity: 0; }
}

.bulletin {
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
}

.project-item {
    background: #f0f0f0;
    border: 1px solid #1a1a1a;
    margin: 8px 0;
    padding: 12px;
    border-radius: 4px;
    transition: transform 0.2s ease;
}

.project-item:hover {
    transform: scale(1.02); /* Subtle hover effect for engagement */
}

.project-desc {
    color: #555555;
    font-size: 18px;
}

.project-meta {
    color: #777777;
    font-size: 16px;
}

.project-link {
    color: #0066cc;
    text-decoration: none;
    font-weight: bold;
}

.project-link:hover {
    text-decoration: underline;
}

.prompt {
    color: #0066cc;
    font-weight: bold;
}
