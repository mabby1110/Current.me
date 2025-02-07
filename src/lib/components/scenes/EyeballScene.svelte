<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { loaded } from '$lib/writables';

	let canvas: HTMLCanvasElement;
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canFly = false;

	onMount(() => {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xffffff);
		scene.fog = new THREE.Fog(0xffffff, 0, 750);

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.set(0, 0, 5);

		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Modelo
		let model;
		const loader = new GLTFLoader().setPath('src/lib/assets/');
		loader.load('nbhd.glb', function (gltf) {
			model = gltf.scene;
			model.position.set(0, -45, 0);
			scene.add(model);
		});

		// Luces
		const ambientLight = new THREE.AmbientLight(0xcccccc);
		scene.add(ambientLight);

		const pointLight = new THREE.PointLight(0xff0000, 10, 100);
		pointLight.position.set(1, 1, 1);
		scene.add(pointLight);

		// Helpers
		const gridHelper = new THREE.GridHelper(10, 10);
		scene.add(gridHelper);

		const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
		scene.add(pointLightHelper);

        // Variables para el control de movimiento
        const velocity = new THREE.Vector3();
        const direction = new THREE.Vector3();
        let prevTouchX = 0;
        let prevTouchY = 0;
        const movementSpeed = 0.3;
        const rotationSpeed = 0.004;

        // Manejadores de eventos táctiles
        function handleTouchStart(event: TouchEvent) {
            const touch = event.touches[0];
            prevTouchX = touch.clientX;
            prevTouchY = touch.clientY;
            canFly = true;
        }

        function handleTouchMove(event: TouchEvent) {
            if (!canFly) return;
            
            const touch = event.touches[0];
            const deltaX = touch.clientX - prevTouchX;
            const deltaY = touch.clientY - prevTouchY;

            // Rotar la cámara basado en el movimiento horizontal del dedo
            camera.rotation.y -= deltaX * rotationSpeed;
            
            // Inclinar la cámara basado en el movimiento vertical del dedo
            camera.rotation.x -= deltaY * rotationSpeed;
            
            // Limitar la rotación vertical para evitar giros completos
            camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

            // Mover hacia adelante mientras se toca la pantalla
            moveForward = true;

            prevTouchX = touch.clientX;
            prevTouchY = touch.clientY;
        }

        function handleTouchEnd() {
            canFly = false;
            moveForward = false;
        }

		// Animación y movimiento
		const animate = () => {
			requestAnimationFrame(animate);

            if (canFly) {
                // Calcular dirección
                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize();

                // Aplicar velocidad en la dirección de la cámara
                if (moveForward) {
                    velocity.z = direction.z * movementSpeed;
                    velocity.x = -direction.x * movementSpeed;
                    
                    // Mover la cámara en la dirección que está mirando
                    camera.translateZ(-velocity.z);
                    camera.translateX(-velocity.x);
                }
            }

			renderer.render(scene, camera);
		};

		animate();

		// Event listeners
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);
		// Manejadores de eventos de ratón
		function handleMouseDown(event: MouseEvent) {
			prevTouchX = event.clientX;
			prevTouchY = event.clientY;
			canFly = true;
			moveForward = true;
		}

		function handleMouseMove(event: MouseEvent) {
			if (!canFly) return;

			const deltaX = event.clientX - prevTouchX;
			const deltaY = event.clientY - prevTouchY;

			// Rotar la cámara basado en el movimiento horizontal del ratón
			camera.rotation.y -= deltaX * rotationSpeed;

			// Inclinar la cámara basado en el movimiento vertical del ratón
			camera.rotation.x -= deltaY * rotationSpeed;

			// Limitar la rotación vertical para evitar giros completos
			camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

			prevTouchX = event.clientX;
			prevTouchY = event.clientY;
		}

		function handleMouseUp() {
			canFly = false;
			moveForward = false;
		}

		canvas.addEventListener('mousedown', handleMouseDown);
		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseup', handleMouseUp);
		canvas.addEventListener('mouseleave', handleMouseUp);
		// Manejo del redimensionamiento
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
			renderer.dispose();
		};
	});

	loaded.set(true);
</script>

<canvas bind:this={canvas} />

<style>
    canvas {
        touch-action: none;
        width: 100%;
        height: 100vh;
        display: block;
    }
</style>