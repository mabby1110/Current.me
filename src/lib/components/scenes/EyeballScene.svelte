<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
	import { loaded } from '$lib/writables';
	
	let canvas: HTMLCanvasElement;

	onMount(() => {
		// Escena
		const scene = new THREE.Scene();

		// Cámara
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		// Renderizador
		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Configurar DRACOLoader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/examples/jsm/libs/draco/'); // Ruta a los archivos del decodificador DRACO

        // Configurar GLTFLoader para usar DRACOLoader
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        // Cargar un modelo comprimido con DRACO
        // gltfLoader.load('src/lib/assets/eye.glb', (gltf) => {
        // const model = gltf.scene;
        // scene.add(model); // Añadir el modelo a la escena
        // }, undefined, (error) => {
        // console.error('Error al cargar el modelo:', error);
        // });

        // Luces
		const pointLight = new THREE.PointLight(0xff0000, 10, 100);
		pointLight.position.set(1, 1, 1);
		scene.add(pointLight);
        
		// Helpers
		const size = 10;
		const divisions = 10;
		const gridHelper = new THREE.GridHelper(size, divisions);
		scene.add(gridHelper);

		const sphereSize = 1;
		const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
		scene.add(pointLightHelper);

		// Controles de movimiento
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.movementSpeed = 5; // Velocidad de movimiento
		controls.rollSpeed = 0.1; // Velocidad de rotación

		// Animación
        const clock = new THREE.Clock();
		const animate = () => {
			requestAnimationFrame(animate);
			// Actualizar FlyControls
			const delta = clock.getDelta();
			controls.update(delta);

			renderer.render(scene, camera);
		};

		animate();

		// Manejo del redimensionamiento de la ventana
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});

		// Limpieza al desmontar el componente
		return () => {
			window.removeEventListener('resize', () => {});
			document.removeEventListener('click', () => {});
			renderer.dispose();
		};
	});

	loaded.set(true)
</script>

<canvas bind:this={canvas} />
