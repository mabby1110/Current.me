<script lang="ts">
    // Importaciones necesarias
    import { onMount } from 'svelte';
    import { loaded } from '$lib/writables';
    import * as THREE from 'three';
    import Stats from 'stats.js';
    import { BulbLight } from '$lib/threeUtils';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    // Variables y configuraciones iniciales
    export let release;

    let container;
    let camera, scene, renderer, windowHalfX, windowHalfY;
    const lights = [];

    const jailSize = 14
    const roomNumberX = jailSize/3
    const roomNumberY = jailSize/3

    let lastPosition = new THREE.Vector3(0, 0, 0);

    let startPosition = new THREE.Vector3(0, 0, -10);

    let landingPosition = new THREE.Vector3(0, 0, -14.5);
    let homePosition = new THREE.Vector3(0, 0, 0);

    let workPosition = new THREE.Vector3(0, 0, 10);
    let aboutPosition = new THREE.Vector3(0, 0, 6);
    
    
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
            camera.position.z = -10
            // iluminacion start
            lights[0] = new BulbLight({ x: 2, y: 2, z: -13 }, 0xffffff, 5);
            lights[0].addToScene(scene);

            // iluminacion home
            lights[1] = new BulbLight({ x: 0, y: 0, z: 0 }, 0x500EFE, 1);
            lights[1].addToScene(scene);

            // iluminacion work
            lights[2] = new BulbLight({ x: 0, y: -4, z: 8 }, 0xffffff, 30);
            lights[2].addToScene(scene);

            // Cubo de esferas
            const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 16);
            const sphereMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff});

            const sphereCountPerAxis = Math.cbrt(500);
            const offset = 3.5

            for (let x = 0; x < sphereCountPerAxis; x++) {
                for (let y = 0; y < sphereCountPerAxis; y++) {
                    for (let z = 0; z < sphereCountPerAxis; z++) {
                        const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

                        // Calcular la posición de cada esfera con el espacio deseado entre ellas
                        mesh.position.x = x-offset;
                        mesh.position.y = y-offset;
                        mesh.position.z = z-offset;

                        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
                        mesh.scale.x = mesh.scale.y = mesh.scale.z = 3 + 1;

                        scene.add(mesh);
                        spheres.push(mesh);
                    }
                }
            }

            // esfera de inicio
            const thing = new THREE.Mesh(sphereGeometry, sphereMaterial);
            // thing.position.x = -0.32;
            // thing.position.y = 0.3;
            thing.position.z = -15;
            scene.add(thing);

            // habitacion
            const wallGeometry = new THREE.BoxGeometry(jailSize, jailSize, 0.1);
            const roomGeometryX = new THREE.BoxGeometry(roomNumberX, jailSize, 0.1);
            const roomGeometryY = new THREE.BoxGeometry(jailSize, roomNumberY, 0.1);
            const wallMaterial = new THREE.MeshPhysicalMaterial({ color: 0x808080, side: THREE.DoubleSide });

            const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
            backWall.position.set(0, 0, 16);
            scene.add(backWall);

            // paredes horizontales
            for (let n = 0; n < roomNumberX-1; n++) {
                const roomWall = new THREE.Mesh(roomGeometryX, wallMaterial);
                roomWall.position.set(-(jailSize/2) + (n*roomNumberX), 0, 14)
                roomWall.rotation.y = Math.PI / 2
                scene.add(roomWall);
            }
            // paredes vertical
            for (let n = 0; n < roomNumberY-1; n++) {
                const roomWall = new THREE.Mesh(roomGeometryY, wallMaterial);
                roomWall.position.set(0, -(jailSize/2) + (n*roomNumberY), 14)
                roomWall.rotation.x = Math.PI / 2
                scene.add(roomWall);
            }

            // helpers y renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.toneMapping = THREE.ReinhardToneMapping;
            container.appendChild(renderer.domElement);


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
                lastPosition = workPosition
                camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, Math.PI / 15, 0.03);
                camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, Math.PI, 0.03);
            } else if (release == 2) {
                lastPosition = aboutPosition
            } else if (release == 3) {
                lastPosition = landingPosition
            } else if (release == 9) {
                for (let i = 0; i < spheres.length; i++) {
                    const sphere = spheres[i];
                    const targetX = 5 * Math.cos(timer + i);
                    const targetY = 5 * Math.sin(timer + i * 1.1);

                    // Interpolación hacia la posición deseada
                    sphere.position.x += (targetX - sphere.position.x) * 0.01; // Ajusta el factor de interpolación según sea necesario
                    sphere.position.y += (targetY - sphere.position.y) * 0.01;
                }
            } else {
                lastPosition = startPosition
                camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, 0, 0.03);
                camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, 0, 0.03);
            }
            // actualizar posicion de la camara segun la vista
            camera.position.lerp(lastPosition, 0.01);

            // ver al rededor de un punto
            // camera.position.x += ( mouseX/4 - camera.position.x ) * 0.008;
			// camera.position.y += ( - ( mouseY/4 ) - camera.position.y ) * 0.008;

			// camera.lookAt( workPosition);
            renderer.render(scene, camera);
        }

        init();
        animate();
        loaded.set(true)
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
