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