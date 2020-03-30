import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private angularFirestore: AngularFirestore) { }

  encontrar(id: string) {
    const usuarioDocument = this.angularFirestore.doc<Usuario>(`usuarios/${id}`);
    return usuarioDocument.valueChanges();
  }

  registrar(usuario: Usuario) {
    const usuarioDocument = this.angularFirestore.doc<Usuario>(`usuarios/${usuario.id}`);
    return usuarioDocument.set(usuario);
  }

  modificar(id: string, usuario: Usuario) {
    const usuarioDocument = this.angularFirestore.doc<Usuario>(`usuarios/${id}`);
    return usuarioDocument.update(usuario);
  }

  eliminar(id: string) {
    const usuarioDocument = this.angularFirestore.doc<Usuario>(`usuarios/${id}`);
    return usuarioDocument.delete();
  }

  usuarios() {
    const usuariosCollection = this.angularFirestore.collection<Usuario>('usuarios');

    return usuariosCollection.valueChanges();
  }

}
