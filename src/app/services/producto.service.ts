import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  actualizaciondate:Date =  new Date("2020-03-27");
  fechainventariodate:Date =  new Date("2020-03-27");

  productos: Producto[] = [
    {id:'123', activo:true, alerta:1, actualizacion:this.actualizaciondate, cantidad:5, estadoinventario:'En Stock',fechainventario:this.fechainventariodate, imagen:'', nombre:'Papitas',precio:2500},
    {id:'234', activo:true, alerta:1, actualizacion:this.actualizaciondate, cantidad:6, estadoinventario:'En Stock',fechainventario:this.fechainventariodate, imagen:'', nombre:'Platanitos',precio:2500}
  ];

  constructor() { }

  encontrar(id:string){
    return this.productos.find(producto => producto.id === id);
  }

  registrar(producto:Producto){
    this.productos.push(producto);
    console.log(this.productos);
  }


}
