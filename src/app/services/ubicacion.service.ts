import { Injectable } from '@angular/core';
import { Ubicacion } from '../interfaces/ubicacion';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private angularFirestore: AngularFirestore) { }

  encontrar(id: string) {
    const ubicacionDocument = this.angularFirestore.doc<Ubicacion>(`ubicacion/${id}`);
    return ubicacionDocument.valueChanges();
  }

  registrar(ubicacion: Ubicacion) {
    console.log(ubicacion);
    const ubicacionDocument = this.angularFirestore.doc<Ubicacion>(`ubicacion/${ubicacion.id}`);
    return ubicacionDocument.set(ubicacion);
  }

  modificar(id: string, ubicacion: Ubicacion) {
    const ubicacionDocument = this.angularFirestore.doc<Ubicacion>(`ubicacion/${id}`);
    return ubicacionDocument.update(ubicacion);
  }

  eliminar(id: string) {
    const ubicacionDocument = this.angularFirestore.doc<Ubicacion>(`ubicacion/${id}`);
    return ubicacionDocument.delete();
  }

  id() {
    return this.angularFirestore.createId();
  }


  ubicacion() {
    const maquinaCollection = this.angularFirestore.collection<Ubicacion>('ubicacion');
    return maquinaCollection.valueChanges();
  }
}
