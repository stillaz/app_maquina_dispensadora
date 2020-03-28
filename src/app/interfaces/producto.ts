export interface Producto {
    id:string,
    nombre:string,
    precio:number,
    cantidad:number,
    activo: boolean,
    alerta:number,
    actualizacion:Date,    
    estadoinventario: string,
    fechainventario:Date,
    imagen:string  
}
