export interface Ubicacion {
    id: string,
    direccion: string,
    nombre: string,
    telefono: string,
    coordenadas: [{lat: string, long: string}],
    imagen: string,
}
