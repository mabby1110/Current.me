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
		camera.position.set(0, 0, 10); // Ajustado para ver mejor la habitación

		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Crear textura para las paredes
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

		// Calcular el tamaño de la habitación basado en la vista de la cámara
		const distance = Math.abs(camera.position.z);
		const vFov = THREE.MathUtils.degToRad(camera.fov);
		const roomHeight = 2 * Math.tan(vFov / 2) * distance;
		const roomWidth = roomHeight * camera.aspect;

		// Crear las paredes
		const wallPositions = [
			{ x: 0, y: 0, z: -roomWidth/2, rotation: [0, 0, 0] }, // back wall
			{ x: -roomWidth/2, y: 0, z: 0, rotation: [0, Math.PI / 2, 0] }, // left wall
			{ x: roomWidth/2, y: 0, z: 0, rotation: [0, -Math.PI / 2, 0] }, // right wall
			{ x: 0, y: roomHeight/2, z: 0, rotation: [Math.PI / 2, 0, 0] }, // top wall
			{ x: 0, y: -roomHeight/2, z: 0, rotation: [-Math.PI / 2, 0, 0] } // bottom wall
		];

		wallPositions.forEach((pos) => {
			const wallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
			const wall = new THREE.Mesh(wallGeometry, wallMaterial);
			wall.position.set(pos.x, pos.y, pos.z);
			wall.rotation.set(...pos.rotation);
			scene.add(wall);
		});

		// Crear la esfera de luz
		const targetPosition = new THREE.Vector3(0, 0, 0);
		const smoothness = $lightControl.smoothness;
		const lightSphereGeometry = new THREE.SphereGeometry(0.08, 32, 32);
		const lightSphereMaterial = new THREE.MeshBasicMaterial({
			color: $lightControl.color,
			emissive: 0xfff000,
			emissiveIntensity: 2
		});
		const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);

		// Crear la luz puntual
		const pointLight = new THREE.PointLight($lightControl.color, 8, roomWidth * 2);
		pointLight.position.set(0, 0, -1);
		lightSphere.add(pointLight);
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

			// Calcular la intersección del rayo con un plano en Z=0
			const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
			const intersection = new THREE.Vector3();
			raycaster.ray.intersectPlane(plane, intersection);

			// Actualizar la posición objetivo
			if (intersection) {
				targetPosition.copy(intersection);
			}
		}

		window.addEventListener('mousemove', moveLightToMouse);

		const animate = () => {
			requestAnimationFrame(animate);
			lightSphere.position.lerp(targetPosition, smoothness);
			pointLight.color.set($lightControl.threeColor);
			renderer.render(scene, camera);
		};

		animate();

		const handleResize = () => {
			// Actualizar cámara
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			
			// Recalcular dimensiones de la habitación
			const newRoomHeight = 2 * Math.tan(vFov / 2) * distance;
			const newRoomWidth = newRoomHeight * camera.aspect;
			
			// Actualizar geometría de las paredes
			scene.children.forEach((child) => {
				if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
					child.geometry.dispose();
					child.geometry = new THREE.PlaneGeometry(newRoomWidth, newRoomHeight);
				}
			});
			
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', moveLightToMouse);
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