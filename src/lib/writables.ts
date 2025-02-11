import { writable } from 'svelte/store';

export const release = writable(0);
export const loaded = writable<boolean>(false);
export const started = writable<boolean>(false);
export const navState = writable({visible: false, kitty: false});

type Project = {
    title: string;
    image: string;
    description: string;
    link: string;
};

export const projects = [
    {
        title: "HoneyHost",
        image: "/path-to-honeyhost-image.jpg", // Reemplaza con la ruta real
        description: "Una colección de scripts y herramientas para la administración profesional de redes empresariales.",
        link: "https://github.com/mabby1110/HoneyHost"
    },
    {
        title: "POS-CRM",
        image: "/path-to-poscrm-image.jpg", // Reemplaza con la ruta real
        description: "Sistema integrado de Punto de Venta (POS) y Gestión de Relaciones con Clientes (CRM) diseñado específicamente para PYMEs, facilitando la administración completa del negocio en una sola plataforma.",
        link: "https://github.com/mabby1110/POS-CRM"
    },
    {
        title: "C de Comercio",
        image: "/path-to-cdecomercio-image.jpg", // Reemplaza con la ruta real
        description: "Concepto de aplicación para el intercambio de bienes y servicios en tu localidad.",
        link: "https://github.com/mabby1110/cd-desktop"
    },
    {
        title: "Artado",
        image: "/path-to-artado-image.jpg", // Reemplaza con la ruta real
        description: "Plataforma social innovadora diseñada para conectar artistas independientes y casas productoras, facilitando la contratación y colaboración en el sector creativo.",
        link: "https://github.com/mabby1110/Artado"
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
  intensity: 2,
  position: { x: 0, y: 2.05, z: 0 },
  smoothness: 0.06
});

// Función para actualizar el color según un valor entre 0 y 1
export function updateLightColor(value) {
  const startColor = 0x4400ff; // Color inicial (amarillo)
  const endColor = 0xfff000;   // Color final (cian)

  const newColor = interpolateColor(value, startColor, endColor);

  lightControl.update(state => ({
    ...state,
    color: newColor
  }));
}