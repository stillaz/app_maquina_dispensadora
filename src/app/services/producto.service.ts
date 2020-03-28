import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

public desktop:Date = new Date("2020-02-11");


  productos: Producto[] = [
    {
      id:'123', nombre:'Papitas', precio:2500, cantidad:5, activo:true, alerta:1, 
      actualizacion:this.desktop, estadoinventario:'En Stock',
      fechainventario:this.desktop, imagen:'../imagen/miImagen.png'
    },
    {
      id:'234', nombre:'Platanitos', precio:2500, cantidad:6, activo:false, alerta:1, 
      actualizacion:this.desktop, estadoinventario:'En Stock',
      fechainventario:this.desktop, imagen:''
    }
  ];

  constructor() {
    console.log(this.desktop);
   }

  encontrar(id:string){
    return this.productos.find(producto => producto.id === id);
  }

  registrar(producto:Producto){
    this.productos.push(producto);
    console.log(this.productos);
  }

  modificar(id:string, producto:Producto){
    const index = this.productos.findIndex(producto => producto.id === id);
    this.productos.splice(index, 1, producto);
    console.log(this.productos);
    alert(this.desktop);
  }

  eliminar(id:string){
    const index = this.productos.findIndex(producto => producto.id === id);
    this.productos.splice(index, 1);
  }

}
