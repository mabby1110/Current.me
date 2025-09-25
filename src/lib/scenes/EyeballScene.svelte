<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';
	import { loaded } from '$lib/writables';
	import { lightControl } from '$lib/writables';
	import { lightIntensity, sceneNumber } from '$lib/threeStores';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 10);

		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const vFov = THREE.MathUtils.degToRad(camera.fov);
		const distance = Math.abs(camera.position.z);
		const roomHeight = 2 * Math.tan(vFov / 2) * distance;
		const roomWidth = roomHeight * camera.aspect;

		const normalMap3 = new THREE.CanvasTexture(new FlakesTexture());
		normalMap3.wrapS = THREE.RepeatWrapping;
		normalMap3.wrapT = THREE.RepeatWrapping;
		normalMap3.repeat.x = 10;
		normalMap3.repeat.y = 6;
		normalMap3.anisotropy = 16;

		const wallMaterial = new THREE.MeshPhysicalMaterial({
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
			metalness: 1,
			roughness: 0.4,
			color: 0xffffff,
			normalMap: normalMap3,
			normalScale: new THREE.Vector2(0.15, 0.15)
		});

		const wallPositions = [
			{ x: 0, y: 0, z: -roomWidth / 2, rotation: [0, 0, 0] },
			{ x: -roomWidth / 2, y: 0, z: 0, rotation: [0, Math.PI / 2, 0] },
			{ x: roomWidth / 2, y: 0, z: 0, rotation: [0, -Math.PI / 2, 0] },
			{ x: 0, y: roomHeight / 2, z: 0, rotation: [Math.PI / 2, 0, 0] },
			{ x: 0, y: -roomHeight / 2, z: 0, rotation: [-Math.PI / 2, 0, 0] }
		];

		const walls = wallPositions.map(pos => {
			const wallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
			const wall = new THREE.Mesh(wallGeometry, wallMaterial);
			wall.position.set(pos.x, pos.y, pos.z);
			wall.rotation.set(...pos.rotation);
			scene.add(wall);
			return wall;
		});

		const targetPosition = new THREE.Vector3(0, 0, 1);
		const smoothness = $lightControl.smoothness;
		const lightSphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
		const lightSphereMaterial = new THREE.MeshBasicMaterial({
			color: $lightControl.color,
			emissive: 0xfff000,
			emissiveIntensity: $lightIntensity
		});
		const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);

		const pointLight = new THREE.PointLight($lightControl.color, $lightIntensity, roomWidth * 2);
		pointLight.position.set(0, 0, 0);
		lightSphere.add(pointLight);
		scene.add(lightSphere);

		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		let lastInteractionPos = new THREE.Vector3();

		function moveLightToPointer(event: MouseEvent | TouchEvent) {
			if ($sceneNumber != 1) return;

			let clientX, clientY;
			if (event instanceof MouseEvent) {
				clientX = event.clientX;
				clientY = event.clientY;
			} else if (event instanceof TouchEvent) {
				if (event.touches.length === 0) return;
				clientX = event.touches[0].clientX;
				clientY = event.touches[0].clientY;
			} else {
				return;
			}

			mouse.x = (clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1);
			const intersection = new THREE.Vector3();

			if (raycaster.ray.intersectPlane(plane, intersection)) {
				lastInteractionPos.copy(intersection);
				targetPosition.copy(intersection);
			}
		}

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			const newRoomHeight = 2 * Math.tan(vFov / 2) * distance;
			const newRoomWidth = newRoomHeight * camera.aspect;

			walls.forEach((wall, i) => {
				wall.geometry.dispose();
				wall.geometry = new THREE.PlaneGeometry(newRoomWidth, newRoomHeight);

				const pos = wallPositions[i];
				if (i === 0) wall.position.z = -newRoomWidth / 2;
				else if (i === 1) wall.position.x = -newRoomWidth / 2;
				else if (i === 2) wall.position.x = newRoomWidth / 2;
				else if (i === 3) wall.position.y = newRoomHeight / 2;
				else if (i === 4) wall.position.y = -newRoomHeight / 2;
			});

			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		window.addEventListener('click', moveLightToPointer);
		window.addEventListener('touchend', moveLightToPointer);
		window.addEventListener('mousemove', moveLightToPointer);
		window.addEventListener('touchmove', moveLightToPointer);
		window.addEventListener('resize', handleResize);

		const animate = () => {
			requestAnimationFrame(animate);

			pointLight.intensity = $lightIntensity;
			controls.update();
			lightSphere.position.lerp(targetPosition, smoothness);
			renderer.render(scene, camera);
		};

		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('click', moveLightToPointer);
			window.removeEventListener('touchend', moveLightToPointer);
			window.removeEventListener('mousemove', moveLightToPointer);
			window.removeEventListener('touchmove', moveLightToPointer);

			walls.forEach(wall => {
				wall.geometry.dispose();
				wall.material.dispose();
			});
			lightSphereGeometry.dispose();
			lightSphereMaterial.dispose();
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
		outline: none;
	}
</style>
