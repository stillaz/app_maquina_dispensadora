export interface Ubicacion {
    id: string,
    direccion: string,
    nombre: string,
    telefono: string,
    coordenadas: {latitud: string, longitud: string},
    imagen: string,
}
