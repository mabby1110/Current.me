<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 

    let container: HTMLElement;
    let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

    // Configuración de las esferas
    const spheres: THREE.Mesh[] = [];

    onMount(() => {
        // Inicialización de la escena, cámara y renderer
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Posicionar la cámara en el centro sin rotación
        camera.position.set(0, 0, 10); // La cámara está en el eje Z mirando hacia el origen
        camera.lookAt(0, 0, 0); // Mira hacia el centro de la escena

        // Crear esferas
        const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        const sphereCountPerAxis = Math.cbrt(125); // 5x5x5 = 125 esferas
        const offset = (sphereCountPerAxis - 1) / 2; // Centrar las esferas en el origen

        for (let x = 0; x < sphereCountPerAxis; x++) {
            for (let y = 0; y < sphereCountPerAxis; y++) {
                for (let z = 0; z < sphereCountPerAxis; z++) {
                    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

                    // Calcular la posición de cada esfera con el espacio deseado entre ellas
                    mesh.position.x = (x - offset) * 1.5; // Espaciado de 1.5 unidades
                    mesh.position.y = (y - offset) * 1.5;
                    mesh.position.z = (z - offset) * 1.5;

                    scene.add(mesh);
                    spheres.push(mesh);
                }
            }
        }
        let controls: OrbitControls; // Variable para almacenar los controles
        // Agregar OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Suaviza el movimiento de la cámara
        controls.dampingFactor = 0.05; // Factor de amortiguación
        controls.screenSpacePanning = true; // Permite panning en el espacio de la pantalla
        controls.minDistance = 5; // Distancia mínima de zoom
        controls.maxDistance = 20; // Distancia máxima de zoom
        // Animación
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotar las esferas ligeramente para darle un efecto dinámico
            spheres.forEach((sphere) => {
                sphere.rotation.x += 0.01;
                sphere.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Manejar el redimensionamiento de la ventana
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        // Limpieza al desmontar el componente
        return () => {
            window.removeEventListener('resize', onWindowResize);
            container.removeChild(renderer.domElement);
        };
    });
</script>

<div bind:this={container} class="container"></div>

<style>
    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>