import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public desktop: Date = new Date("2020-02-11");

  constructor(private angularFirestore: AngularFirestore) { }

  encontrar(id: string, maquina?: string) {
    const productoDocument = maquina
      ? this.angularFirestore.doc<Producto>(`maquinas/${maquina}/productos/${id}`)
      : this.angularFirestore.doc<Producto>(`productos/${id}`);
    return productoDocument.valueChanges();
  }

  registrar(producto: Producto, maquina?: string) {
    const productoDocument = maquina
      ? this.angularFirestore.doc<Producto>(`maquinas/${maquina}/productos/${producto.id}`)
      : this.angularFirestore.doc<Producto>(`productos/${producto.id}`);
    return productoDocument.set(producto);
  }

  modificar(id: string, producto: Producto, maquina?: string) {
    const productoDocument = maquina
      ? this.angularFirestore.doc<Producto>(`maquinas/${maquina}/productos/${id}`)
      : this.angularFirestore.doc<Producto>(`productos/${id}`);
    return productoDocument.update(producto);
  }

  eliminar(id: string, maquina?: string) {
    const productoDocument = maquina
      ? this.angularFirestore.doc<Producto>(`maquinas/${maquina}/productos/${id}`)
      : this.angularFirestore.doc<Producto>(`productos/${id}`);
    return productoDocument.delete();
  }

  productos(idmaquina?: string) {
    const productosCollection = idmaquina
      ? this.angularFirestore.collection<Producto>(`maquinas/${idmaquina}/productos`)
      : this.angularFirestore.collection<Producto>('productos');

    return productosCollection.valueChanges();
  }

}
