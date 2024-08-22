import * as THREE from 'three';

export class BulbLight {
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

export function createStarField(scene: THREE.Scene, starCount: number, spread: number): void {
    // Crear geometría para las estrellas
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff, // Color blanco para las estrellas
        size: 0.1, // Tamaño de las estrellas
        sizeAttenuation: true, // Tamaño relativo a la distancia de la cámara
    });

    // Crear los vértices de las estrellas
    const positions: number[] = [];
    for (let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(spread);
        const y = THREE.MathUtils.randFloatSpread(spread);
        const z = THREE.MathUtils.randFloatSpread(spread);
        positions.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Crear el objeto de puntos y añadirlo a la escena
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}