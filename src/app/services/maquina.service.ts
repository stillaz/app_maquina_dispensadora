import { Injectable } from '@angular/core';
import { Maquina } from '../interfaces/maquina';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  constructor(private angularFirestore: AngularFirestore) { }

  encontrar(id: string) {
    const maquinaDocument = this.angularFirestore.doc<Maquina>(`maquinas/${id}`);
    return maquinaDocument.valueChanges();
  }

  registrar(maquina: Maquina) {
    const maquinaDocument = this.angularFirestore.doc<Maquina>(`maquinas/${maquina.id}`);
    return maquinaDocument.set(maquina);
  }

  modificar(id: string, maquina: Maquina) {
    const maquinaDocument = this.angularFirestore.doc<Maquina>(`maquinas/${id}`);
    return maquinaDocument.update(maquina);
  }

  eliminar(id: string) {
    const maquinaDocument = this.angularFirestore.doc<Maquina>(`maquinas/${id}`);
    return maquinaDocument.delete();
  }

  id() {
    return this.angularFirestore.createId();
  }

  maquinas() {
    const maquinaCollection = this.angularFirestore.collection<Maquina>('maquinas');
    return maquinaCollection.valueChanges();
  }

}
