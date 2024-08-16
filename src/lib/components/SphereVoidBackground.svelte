<script lang="ts">
    // Importaciones necesarias
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import Stats from 'stats.js';
    import { BulbLight } from '$lib/threeUtils';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { FlyControls } from 'three/addons/controls/FlyControls.js';

    // Variables y configuraciones iniciales
    export let release;
    const clock = new THREE.Clock();
    let container;
    let camera, scene, renderer, windowHalfX, windowHalfY, controls;
    const lights = [];
    const lightHelpers = [];
    let homePosition = new THREE.Vector3(0, 0, 0);
    let workPosition = new THREE.Vector3(0, 2, 8);
    let aboutPosition = new THREE.Vector3(0, 0, 5);
    let bulbLight, bulbMat, hemiLight;

    // Configuraciones de iluminación
    const spheres = [];

    // configuracion y animacion principal
    onMount(() => {
        let stats;    
        let mouseX = 0, mouseY = 0;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', onDocumentMouseMove);
        window.addEventListener('resize', onWindowResize);

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);

            // iluminacion home
            lights[0] = new BulbLight({ x: 0, y: 0, z: 0 }, 0x500EFE, 1);
            lights[0].addToScene(scene);

            // iluminacion work
            lights[1] = new BulbLight({ x: 0, y: 8, z: 8 }, 0xffffff, 30);
            lights[1].addToScene(scene);

            // Cubo de esferas
            const cubeGeometry = new THREE.SphereGeometry(0.1, 32, 16);
            const cubeMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff});

            const sphereCountPerAxis = Math.cbrt(500);
            const offset = 3.5

            for (let x = 0; x < sphereCountPerAxis; x++) {
                for (let y = 0; y < sphereCountPerAxis; y++) {
                    for (let z = 0; z < sphereCountPerAxis; z++) {
                        const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

                        // Calcular la posición de cada esfera con el espacio deseado entre ellas
                        mesh.position.x = x-offset;
                        mesh.position.y = y-offset;
                        mesh.position.z = z-offset;

                        // mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
                        mesh.scale.x = mesh.scale.y = mesh.scale.z = 3 + 1;

                        scene.add(mesh);
                        spheres.push(mesh);
                    }
                }
            }

            // habitacion
            const roomGeometry = new THREE.BoxGeometry(10, 10, 0.1);
            const roomMaterial = new THREE.MeshPhysicalMaterial({ color: 0x808080, side: THREE.DoubleSide });

            const center = { x: 0, y: -5, z: 10 };
            const sizeX = 5; // Tamaño en la dirección X
            const sizeY = 5; // Tamaño en la dirección Y
            const sizeZ = 5; // Tamaño en la dirección Z

            const positions = [
                // { x: center.x, y: center.y + sizeY / 2, z: center.z - sizeZ / 2 }, // Pared frontal
                { x: center.x, y: center.y + sizeY / 2, z: center.z + sizeZ / 2 }, // Pared trasera
                { x: center.x - sizeX / 2, y: center.y + sizeY / 2, z: center.z, rotationY: Math.PI / 2 }, // Pared izquierda
                { x: center.x + sizeX / 2, y: center.y + sizeY / 2, z: center.z, rotationY: Math.PI / 2 }, // Pared derecha
                { x: center.x, y: center.y, z: center.z, rotationX: Math.PI / 2 }, // Piso
                { x: center.x, y: center.y + sizeY, z: center.z, rotationX: Math.PI / 2 } // Techo
            ];

            positions.forEach(pos => {
                const mesh = new THREE.Mesh(roomGeometry, roomMaterial);
                mesh.position.set(pos.x, pos.y, pos.z);
                if (pos.rotationY) mesh.rotation.y = pos.rotationY;
                if (pos.rotationX) mesh.rotation.x = pos.rotationX;
                scene.add(mesh);
            });

            // helpers y renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);            renderer.shadowMap.enabled = true;
            renderer.toneMapping = THREE.ReinhardToneMapping;
            container.appendChild(renderer.domElement);
            
            // controls = new FlyControls( camera, renderer.domElement );

            // controls.movementSpeed = 2;
            // controls.domElement = container;
            // controls.rollSpeed = Math.PI / 6;
            // controls.autoForward = false;
            // controls.dragToLook = false;


            const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
            gridHelper.position.y = 0;
            gridHelper.position.x = 0;
            scene.add( gridHelper );
            
            stats = new Stats();
            container.appendChild(stats.dom);
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 100;
            mouseY = (event.clientY - windowHalfY) / 100;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
            stats.update();
        }

        function render() {
            const timer = 0.0001 * Date.now();
            if (release == 1){
                camera.position.lerp(workPosition, 0.01);
                camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, Math.PI / 15, 0.03);
                camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, Math.PI, 0.03);
            } else if (release == 2) {
                camera.position.lerp(aboutPosition, 0.02);
            } else if (release == 3) {
                for (let i = 0; i < spheres.length; i++) {
                    const sphere = spheres[i];
                    const targetX = 5 * Math.cos(timer + i);
                    const targetY = 5 * Math.sin(timer + i * 1.1);

                    // Interpolación hacia la posición deseada
                    sphere.position.x += (targetX - sphere.position.x) * 0.01; // Ajusta el factor de interpolación según sea necesario
                    sphere.position.y += (targetY - sphere.position.y) * 0.01;
                }
            } else {
                camera.position.lerp(homePosition, 0.05);
                camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, 0, 0.03);
                camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, 0, 0.03);
            }

            // ver al rededor de un punto
            camera.position.x += ( mouseX - camera.position.x ) * 0.008;
			camera.position.y += ( - ( mouseY ) - camera.position.y ) * 0.008;

			// camera.lookAt( workPosition);
            renderer.render(scene, camera);
        }

        init();
        animate();
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
    