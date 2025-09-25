import { writable } from 'svelte/store';

export const release = writable(0);
export const loaded = writable<boolean>(false);
export const started = writable<boolean>(false);
export const navState = writable({ visible: false });

type Project = {
	title: string;
	image: string;
	description: string;
	link: string;
	color: string;
};

export const projects = [
	{
		title: "don't click here",
		image: '/OriginalWin7Icons/47.ico', // Replace with the actual path
		description:
			'This page was made from scratch. call +52 669 159 72 09 or email me bernardoa.marquezg@gmail.com for custom software pieces',
		link: 'https://github.com/mabby1110/Current.me',
		color: 'transparent'
	},
	{
		title: 'HoneyHost',
		image: '/honey-host-git-repo.png', // Replace with the actual path
		description:
			'A collection of scripts and tools for professional enterprise network management.',
		link: 'https://github.com/mabby1110/HoneyHost',
		color: 'crimson'
	},
	{
		title: 'POS-CRM',
		image: '/POS-CRM-git-repo.png', // Replace with the actual path
		description:
			'An integrated Point of Sale (POS) and Customer Relationship Management (CRM) system designed specifically for SMEs, facilitating complete business management on a single platform.',
		link: 'https://github.com/mabby1110/POS-CRM',
		color: 'darkblue'
	}
];

export const selectedProject = writable<Project>(projects[0]);

// Store para controlar la luz

// Función para interpolar entre dos colores
function interpolateColor(value, startColor, endColor) {
	const startR = (startColor >> 16) & 0xff;
	const startG = (startColor >> 8) & 0xff;
	const startB = startColor & 0xff;

	const endR = (endColor >> 16) & 0xff;
	const endG = (endColor >> 8) & 0xff;
	const endB = endColor & 0xff;

	const r = Math.round(startR + value * (endR - startR));
	const g = Math.round(startG + value * (endG - startG));
	const b = Math.round(startB + value * (endB - startB));

	return (r << 16) + (g << 8) + b;
}

export const lightControl = writable({
	color: 0x4400ff,
	intensity: 8,
	position: { x: 0, y: 2.05, z: 0 },
	smoothness: 0.06
});

// Función para actualizar el color según un valor entre 0 y 1
export function updateLightColor(value) {
	const startColor = 0x4400ff; // Color inicial (amarillo)
	const endColor = 0xfff000; // Color final (cian)

	const newColor = interpolateColor(value, startColor, endColor);

	lightControl.update((state) => ({
		...state,
		color: newColor
	}));
}

export const infoStore = writable({ scrollY: 0, info: 'Mantener presionado para iniciar' });
