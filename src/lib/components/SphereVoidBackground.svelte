<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import Stats from 'stats.js';
    import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // Import FontLoader
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'; // Import TextGeometry

    export let release;
    let container;
    
    let camera, scene, renderer, windowHalfX, windowHalfY;
    const lights = [];
    const lightHelpers = [];
    
    let homePosition = new THREE.Vector3(0, 0, 0);
    let workPosition = new THREE.Vector3(0, 2, 8);
    let aboutPosition = new THREE.Vector3(0, 0, 5);
    let bulbLight, bulbMat, hemiLight;

    // Agregamos las referencias para las potencias luminosas y las irradiancias
    const bulbLuminousPowers = {
        '110000 lm (1000W)': 110000,
        '3500 lm (300W)': 3500,
        '1700 lm (100W)': 1700,
        '800 lm (60W)': 800,
        '400 lm (40W)': 400,
        '180 lm (25W)': 180,
        '20 lm (4W)': 20,
        'Off': 0
    };

    const hemiLuminousIrradiances = {
        '0.0001 lx (Moonless Night)': 0.0001,
        '0.002 lx (Night Airglow)': 0.002,
        '0.5 lx (Full Moon)': 0.5,
        '3.4 lx (City Twilight)': 3.4,
        '50 lx (Living Room)': 50,
        '100 lx (Very Overcast)': 100,
        '350 lx (Office Room)': 350,
        '400 lx (Sunrise/Sunset)': 400,
        '1000 lx (Overcast)': 1000,
        '18000 lx (Daylight)': 18000,
        '50000 lx (Direct Sun)': 50000
    };

    const params = {
        shadows: true,
        exposure: 0.68,
        bulbPower: Object.keys(bulbLuminousPowers)[4],
        hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0]
    };

    function createLight(color, intensity, distance, position, lightHelper = false) {
        const light = new THREE.PointLight(color, intensity, distance);
        light.position.set(position.x, position.y, position.z);
        scene.add(light);
        
        if (lightHelper) {
            const lightHelper = new THREE.PointLightHelper(light);
            scene.add(lightHelper);
        }
        return light;
    }
    class BulbLight {
        constructor(position = { x: 0, y: 0, z: 0 }, color = 0xffffff, intensity = 1, distance = 100, decay = 2) {
            const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
            const bulbMat = new THREE.MeshStandardMaterial({
                emissive: 0xffffee,
                emissiveIntensity: 1,
                color: 0x000000
            });
            this.light = new THREE.PointLight(color, intensity, distance, decay);
            this.light.add(new THREE.Mesh(bulbGeometry, bulbMat));
            this.light.position.set(position.x, position.y, position.z);
            this.light.castShadow = true;
        }

        addToScene(scene) {
            scene.add(this.light);
        }
    }

    const spheres = [];

    onMount(() => {
        let effect, stats;
        
        let mouseX = 0, mouseY = 0;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', onDocumentMouseMove);
        window.addEventListener('resize', onWindowResize);

        init();
        animate();

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);

            // iluminacion home
            lights[0] = new BulbLight({ x: 0, y: 0, z: 0 }, 0x500EFE, 1);
            lights[0].addToScene(scene);

            // iluminacion work
            lights[1] = new BulbLight({ x: 2, y: 2, z: 13 }, 0xffffff, 3);
            lights[1].addToScene(scene);
            lights[2] = new BulbLight({ x: 2, y: -2, z: 13 }, 0xffffff, 3);
            lights[2].addToScene(scene);
            lights[3] = new BulbLight({ x: -2, y: 2, z: 13 }, 0xffffff, 3);
            lights[3].addToScene(scene);
            lights[4] = new BulbLight({ x: -2, y: -2, z: 13 }, 0xffffff, 3);
            lights[4].addToScene(scene);

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
            // Crear geometría y material para las paredes de la habitación
            const roomGeometry = new THREE.BoxGeometry(10, 10, 0.1);
            const roomMaterial = new THREE.MeshPhysicalMaterial({ color: 0x808080, side: THREE.DoubleSide });

            const center = { x: 0, y: -5, z: 10 };
            const sizeX = 10; // Tamaño en la dirección X
            const sizeY = 10; // Tamaño en la dirección Y
            const sizeZ = 10; // Tamaño en la dirección Z

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

            // render & helpers
            const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
            gridHelper.position.y = 0;
            gridHelper.position.x = 0;
            scene.add( gridHelper );

            
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);            renderer.shadowMap.enabled = true;
            renderer.toneMapping = THREE.ReinhardToneMapping;
            container.appendChild(renderer.domElement);
            
            const width = window.innerWidth || 2;
            const height = window.innerHeight || 2;
            
            stats = new Stats();
            container.appendChild(stats.dom);
            
            // Asumiendo que ya tienes una instancia de cámara y escena configuradas
            // const controls = new OrbitControls(camera, renderer.domElement);
            // controls.enableDamping = true; // Habilita el amortiguamiento
            // controls.dampingFactor = 0.25; // Factor de amortiguamiento
            // controls.enableZoom = true;   // Permite hacer zoom
            // controls.enablePan = true;    // Permite mover la vista lateralmente
            // controls.enableRotate = true; // Permite rotar la vista
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            
            effect.setSize(window.innerWidth, window.innerHeight);
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
            
            renderer.render(scene, camera);
        }
    });
</script>

<style>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<div bind:this={container} class="container"></div>