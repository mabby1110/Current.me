<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';
	import { loaded } from '$lib/writables';
	import { lightControl } from '$lib/writables';

	let canvas: HTMLCanvasElement;
	onMount(() => {
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.set(0, 1.5, 6);

		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// helpers
		// const controls = new OrbitControls(camera, renderer.domElement);
		// scene.add(controls);

		// Objetos
		const roomSize = 3;
		const numRooms = 3;
		const normalMap3 = new THREE.CanvasTexture(new FlakesTexture());
		normalMap3.wrapS = THREE.RepeatWrapping;
		normalMap3.wrapT = THREE.RepeatWrapping;
		normalMap3.repeat.x = 10;
		normalMap3.repeat.y = 6;
		normalMap3.anisotropy = 16;
		let wallMaterial = new THREE.MeshPhysicalMaterial({
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
			metalness: 1,
			roughness: 0.4,
			color: 0xffffff,
			normalMap: normalMap3,
			normalScale: new THREE.Vector2(0.15, 0.15)
		});
		// let wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0 } )
		for (let i = 0; i < numRooms; i++) {
			const roomY = i * roomSize - (numRooms * roomSize) / 2;

			// Create walls
			const wallGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
			const wallPositions = [
				{ x: 0, y: roomY, z: -roomSize / 2, rotation: [0, 0, 0] }, // back wall
				{ x: -roomSize / 2, y: roomY, z: 0, rotation: [0, Math.PI / 2, 0] }, // left wall
				{ x: roomSize / 2, y: roomY, z: 0, rotation: [0, -Math.PI / 2, 0] }, // right wall
				{ x: 0, y: roomY + roomSize / 2, z: 0, rotation: [Math.PI / 2, 0, 0] }, // top wall
				{ x: 0, y: roomY - roomSize / 2, z: 0, rotation: [-Math.PI / 2, 0, 0] } // bottom wall||
			];

			wallPositions.forEach((pos) => {
				const wall = new THREE.Mesh(wallGeometry, wallMaterial);
				wall.position.set(pos.x, pos.y, pos.z);
				wall.rotation.set(...pos.rotation);
				scene.add(wall);
			});
		}
		// Crear la esfera de luz
		const targetPosition = new THREE.Vector3(0, 1.5, 0); // Posición objetivo
		const smoothness = $lightControl.smoothness; // Factor de suavizado (0.1 es suave, 1 es inmediato)
		const lightSphereGeometry = new THREE.SphereGeometry(0.08, 32, 32);
		const lightSphereMaterial = new THREE.MeshBasicMaterial({
			color: $lightControl.color,
			emissive: 0xfff000,
			emissiveIntensity: 2
		});
		const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);

		// Crear la luz puntual
		const pointLight = new THREE.PointLight($lightControl.color, 2, 10);
		pointLight.position.set(0, 0, -1);
		lightSphere.add(pointLight); // La esfera contiene la luz
		scene.add(lightSphere);

		// Variables para el rayo y el mouse
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		function moveLightToMouse(event) {
			// Convertir la posición del mouse a coordenadas normalizadas (-1 to 1)
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			// Lanzar un rayo desde la cámara en la dirección del mouse
			raycaster.setFromCamera(mouse, camera);

			// Calcular la intersección del rayo con un plano en Z=0 (o cualquier otro plano)
			const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
			const intersection = new THREE.Vector3();
			raycaster.ray.intersectPlane(plane, intersection);

			// Actualizar la posición objetivo
			if (intersection) {
				targetPosition.copy(intersection);
			}
		}

		// Evento para mover la luz con el mouse
		window.addEventListener('mousemove', moveLightToMouse);

		// Animación y movimiento
		const animate = () => {
			requestAnimationFrame(animate);

			// Interpolación suave de la posición
			lightSphere.position.lerp(targetPosition, smoothness);

			// Interpolación suave del color
			pointLight.color.set($lightControl.threeColor);
			// helpers
			// controls.update();
			// render
			renderer.render(scene, camera);
		};

		animate();

		// Manejo del redimensionamiento
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
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
