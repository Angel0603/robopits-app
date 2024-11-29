// lib/ApiService.js
import { Platform } from 'react-native';

class ApiService {
    static instance = null;

    static getInstance() {
        if (ApiService.instance === null) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async fetchData(endpoint, options = {}) {
        const baseUrl = Platform.select({
            ios: `https://back-end-robopits.vercel.app`,
            android: `https://back-end-robopits.vercel.app`,
            default: `https://back-end-robopits.vercel.app`,
        });

        const url = `${baseUrl}/api/${endpoint}`;
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include', // Habilita el envío de cookies
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            // Maneja errores 404 o similares sin lanzar excepción
            if (!response.ok) {
                const errorText = await response.text();
                return { error: true, status: response.status, message: errorText };
            }

            // Procesa respuesta JSON si es posible
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                console.error("Respuesta no JSON recibida:", await response.text());
                return { error: true, message: "La respuesta del servidor no es JSON." };
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
            console.log("URL de la petición:", url);
            return { error: true, message: error.message };
        }
    }
}

export default ApiService;
