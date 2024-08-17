import { writable } from 'svelte/store';

export const release = writable(0);
export const loaded = writable(false);