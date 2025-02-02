<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";

    // On component mount, set the release version
    onMount(() => {
        release.set(2);
    });
</script>

<div class="windows-xp-container">
    <!-- General Information Section -->
    <div class="xp-panel general-info">
        <div class="xp-title-bar">
            <span class="xp-title">About Me</span>
            <div class="xp-controls">
                <button class="xp-minimize">-</button>
                <button class="xp-maximize">□</button>
                <button class="xp-close">×</button>
            </div>
        </div>
        <div class="xp-content personal-details">
            <h1>Bernardo A. Márquez</h1>
            <h3>Software Development Engineer</h3>
            <p>
                I am a graduate of the Universidad Autónoma de Guadalajara, with experience in designing, developing, and implementing software applications, both existing and custom-built. I stay up-to-date with current technological trends and understand the key factors required to solve specific problems, whether by utilizing pre-existing solutions or creating new ones. My goal is to deliver high-quality, efficient, and scalable software solutions that meet the needs of clients and end-users.
            </p>
        </div>
    </div>

    <!-- Technical Skills Section -->
    <div class="xp-panel technical-skills">
        <div class="xp-title-bar">
            <span class="xp-title">Technical Skills</span>
            <div class="xp-controls">
                <button class="xp-minimize">-</button>
                <button class="xp-maximize">□</button>
                <button class="xp-close">×</button>
            </div>
        </div>
        <div class="xp-content">
            <!-- Programming Languages -->
            <h3>Programming Languages</h3>
            <ul>
                <li>Python</li>
                <li>JavaScript (HTML, CSS)</li>
                <li>C/C++</li>
                <li>SQL</li>
                <li>TypeScript</li>
                <li>C#</li>
                <li>PHP</li>
                <li>Java</li>
            </ul>

            <!-- Frameworks and Libraries -->
            <h3>Frameworks and Libraries</h3>
            <h4>Frontend:</h4>
            <ul>
                <li>Vue</li>
                <li>Svelte</li>
                <li>React</li>
                <li>Angular</li>
                <li>Three.js</li>
            </ul>
            <h4>Backend:</h4>
            <ul>
                <li>Node.js</li>
                <li>Flask</li>
                <li>Django</li>
                <li>Pocketbase</li>
                <li>Firebase</li>
                <li>SQLAlchemy</li>
                <li>SQLite</li>
            </ul>
            <h4>Data Science and Machine Learning:</h4>
            <ul>
                <li>NumPy</li>
                <li>Pandas</li>
                <li>Matplotlib</li>
                <li>MNE (Electrophysiology)</li>
            </ul>
            <h4>Game Development and Simulations:</h4>
            <ul>
                <li>Unity</li>
                <li>Unreal Engine</li>
                <li>Pygame</li>
                <li>Three.js (WebGL)</li>
                <li>Tkinter (Python GUI)</li>
            </ul>

            <!-- Tools and Technologies -->
            <h3>Tools and Technologies</h3>
            <h4>Version Control:</h4>
            <ul>
                <li>Git</li>
                <li>SourceTree</li>
            </ul>
            <h4>Containers and Virtualization:</h4>
            <ul>
                <li>Docker</li>
                <li>Conda</li>
            </ul>
            <h4>Agile Methodologies:</h4>
            <ul>
                <li>Scrum</li>
                <li>Kanban</li>
            </ul>
            <h4>Project Management:</h4>
            <ul>
                <li>Trello</li>
                <li>Zoho</li>
            </ul>
            <h4>Design and Prototyping:</h4>
            <ul>
                <li>Figma</li>
            </ul>
            <h4>Development Environments:</h4>
            <ul>
                <li>VS Code</li>
                <li>Vim</li>
                <li>NetBeans</li>
                <li>Eclipse</li>
                <li>Dev-C++</li>
            </ul>
            <h4>Package Management:</h4>
            <ul>
                <li>npm</li>
                <li>pip</li>
            </ul>
            <h4>Google Tools:</h4>
            <ul>
                <li>Google Colab</li>
                <li>Google Drive</li>
                <li>Google Docs</li>
                <li>Google Sheets</li>
            </ul>
        </div>
    </div>
</div>

<style>
    /* Custom Color Palette */
    :root {
        --primary-color: rgba(21, 21, 22, 0.786);
        --secondary-color: rgb(0, 0, 0);
        --tertiary-color: rgb(70, 73, 75);
        --accent-color: #500EFE;
        --text-body: #ffffff;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    body {
        font-family: "Tahoma", "Arial", sans-serif;
        background-color: var(--primary-color);
        color: var(--text-body);
        margin: 0;
        padding: 0;
    }

    .windows-xp-container {
        padding: 1rem;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        min-height: 100vh; /* Adjust height to fit content */
    }

    .xp-panel {
        background-color: var(--secondary-color);
        border: 1px solid var(--tertiary-color);
        border-radius: 4px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        min-height: fit-content; /* Adjust height to fit content */
    }

    .xp-title-bar {
        background: var(--tertiary-color);
        color: var(--text-body);
        padding: 4px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
    }

    .xp-controls {
        display: flex;
        gap: 4px;
    }

    .xp-controls button {
        background-color: var(--primary-color);
        border: 1px solid var(--tertiary-color);
        color: var(--text-body);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
    }

    .xp-controls button:hover {
        background-color: var(--accent-color);
    }

    .xp-content {
        padding: 1rem;
    }

    h1 {
        color: var(--accent-color);
        margin-bottom: 0.6rem;
    }

    h2, h3, h4 {
        color: var(--text-body);
        margin-bottom: 1rem;
    }

    ul {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
        color: var(--text-body);
    }

    .personal-details,
    .technical-skills {
        background-color: var(--secondary-color);
    }
</style>