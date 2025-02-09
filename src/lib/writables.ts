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
export const lightControl = writable({
    color: 0x4400ff,
    intensity: 2,
    position: { x: 0, y: 2.05, z: 0 },
    smoothness: 0.06
});