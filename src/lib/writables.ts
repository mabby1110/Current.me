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
        description: "HoneyHost es una plataforma de hosting que ofrece servicios de alojamiento web con interfaz intuitiva y herramientas de seguridad avanzadas.",
        link: "https://github.com/mabby1110/HoneyHost"
    },
    {
        title: "POS-CRM",
        image: "/path-to-poscrm-image.jpg", // Reemplaza con la ruta real
        description: "Sistema punto de venta integrado con CRM para gestión de inventario y relaciones con clientes.",
        link: "https://github.com/mabby1110/POS-CRM"
    },
    {
        title: "C de Comercio",
        image: "/path-to-cdecomercio-image.jpg", // Reemplaza con la ruta real
        description: "Aplicación de escritorio para gestión comercial con interfaz moderna y funcionalidades avanzadas.",
        link: "https://github.com/mabby1110/cd-desktop"
    },
    {
        title: "Artado",
        image: "/path-to-artado-image.jpg", // Reemplaza con la ruta real
        description: "Plataforma para artistas digitales que permite compartir y monetizar su trabajo.",
        link: "https://github.com/mabby1110/Artado"
    }
];

export const selectedProject = writable<Project>(projects[0]);