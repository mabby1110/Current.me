import { writable } from 'svelte/store';

// Store para la intensidad de la luz
export const lightIntensity = writable(8); // Valor inicial de 8
export const sceneNumber = writable(0);