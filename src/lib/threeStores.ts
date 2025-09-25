import { writable } from 'svelte/store';

// Store para la intensidad de la luz
export const lightIntensity = writable(0); // Valor inicial de 2
export const sceneNumber = writable(0);