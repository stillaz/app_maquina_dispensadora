import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LogueoService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loguear(usuario: string, contrasena: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario, contrasena);
  }

  desloguear() {
    this.angularFireAuth.auth.signOut();
  }

  usuario() {
    return this.angularFireAuth.user;
  }

  recuperacion(correo_electronico: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(correo_electronico);
  }

}
