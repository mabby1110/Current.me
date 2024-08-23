<script lang="ts">
    import { onMount } from "svelte";
    import { release } from "$lib/writables";
    onMount(()=>{
        release.set(2)
    })
</script>

<div class="aboutContainer">
    <div class="generales">
        <div class="datos">
            <h1>Bernardo A. Márquez</h1>
            <h3>Ing, en desarrollo de software</h3>
            <p>Soy Egresado de la Universidad Autónoma de Guadalajara, con experiencia en el diseño, desarrollo e implementación de aplicaciones de software, tanto existentes como a la medida. Estoy comprometido con mantenerme al día con las tendencias tecnológicas actuales y comprendo los factores clave para resolver problemas específicos, ya sea utilizando soluciones preexistentes o creando nuevas.</p>
        </div>
        <div class="datos">
            <h2>Experiencia</h2>
            <p>no tengo :(</p>
        </div>
    </div>
    <div class="datos tecnicos">
        <h2>Habilidades Técnicas</h2>

        <h3>Lenguajes de Programación</h3>
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

        <h3>Frameworks y Librerías</h3>

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
            <li>Node</li>
            <li>Flask</li>
            <li>Django</li>
            <li>Pocketbase</li>
            <li>Firebase</li>
            <li>SQLAlchemy</li>
            <li>SQLite</li>
        </ul>

        <h4>Data Science y Machine Learning:</h4>
        <ul>
            <li>NumPy</li>
            <li>Pandas</li>
            <li>Matplotlib</li>
            <li>MNE (Electrofisiología)</li>
        </ul>

        <h4>Desarrollo de Juegos y Simulaciones:</h4>
        <ul>
            <li>Unity</li>
            <li>Unreal Engine</li>
            <li>Pygame</li>
            <li>Three.js (WebGL)</li>
            <li>Tkinter (Interfaces gráficas en Python)</li>
        </ul>

        <h3>Herramientas y Tecnologías</h3>

        <h4>Control de Versiones:</h4>
        <ul>
            <li>Git</li>
            <li>SourceTree</li>
        </ul>

        <h4>Contenedores y Virtualización:</h4>
        <ul>
            <li>Docker</li>
            <li>Conda</li>
        </ul>

        <h4>Metodologías Ágiles:</h4>
        <ul>
            <li>Scrum</li>
            <li>Kanban</li>
        </ul>

        <h4>Gestión de Proyectos:</h4>
        <ul>
            <li>Trello</li>
            <li>Zoho</li>
        </ul>

        <h4>Diseño y Prototipado:</h4>
        <ul>
            <li>Figma</li>
        </ul>

        <h4>Entornos de Desarrollo:</h4>
        <ul>
            <li>VS Code</li>
            <li>Vim</li>
            <li>NetBeans</li>
            <li>Eclipse</li>
            <li>Dev-C++</li>
        </ul>

        <h4>Gestión de Paquetes:</h4>
        <ul>
            <li>npm</li>
            <li>pip</li>
        </ul>

        <h4>Herramientas de Google:</h4>
        <ul>
            <li>Google collab</li>
            <li>Google Drive</li>
            <li>Google Docs</li>
            <li>Google Sheets</li>
        </ul>

    </div>
</div>

<style>
    .aboutContainer {
        padding: 1rem;
        position: fixed;
        top: 0;
        width: 100%;
        height: 95vh;
        gap: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        overflow: scroll;
    }
    .datos   {
        background-color: #0f042bb7;
        border-radius: 10px;
        padding: 1rem;
        height: fit-content;
    }
    .generales {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h1 {
        margin-bottom: 0.6rem;
    }
    h2, h3{
        margin-bottom: 2rem;
    }
    ul {
        margin-bottom: 3rem;
    }
    .tecnicos {
        grid-row: auto / span 1;
    }
</style>