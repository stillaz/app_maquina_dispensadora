import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { FotoPage } from '../../foto/foto.page';
import { validateEventsArray } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {

  formulario: FormGroup;
  id: string;
  id_ubicacion: string;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    let usuario = {} as Usuario;
    if (this.id) {
      usuario = await this.obtener(this.id);
    }

    this.formulario = this.formBuilder.group({
      id: [usuario.id, Validators.required, this.valorUnico()],
      nombre: [usuario.nombre, Validators.required],
      correo_electronico: [usuario.correo_electronico, [Validators.required, Validators.email]],
      clave: [usuario.clave, Validators.required],
      perfil: [usuario.perfil, Validators.required]
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  guardar() {
    const usuario: Usuario = this.formulario.value;
    this.formulario.controls.id.enable;
    if (this.id) {
      this.usuarioService.modificar(this.id, usuario).then(() => {
        this.presentToast('Se ha actualizado el usuario correctamente.');
        this.cerrar();
      }).catch(err => this.presentAlert('Actualizar usuario', err, 'No se pudo actualizar el usuario'));
    } else {
      this.usuarioService.registrar(usuario).then(() => {
        this.presentToast('Se ha registrado el usuario correctamente');
        this.cerrar();
      }).catch(err => this.presentAlert('Registrar usuario', err, 'No se pudo registrar el usuario'));
    }
  }

  private async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  eliminar() {
    this.usuarioService.eliminar(this.id).then(() => {
      this.presentToast('Se ha eliminado el usuario.');
      this.cerrar();
    }).catch(err => this.presentAlert('Eliminar usuario', err, 'No se pudo eliminar el usuario'));;
  }

  private obtener(id: string) {
    return new Promise<Usuario>(resolve => {
      this.usuarioService.encontrar(id).subscribe(usuario => {
        resolve(usuario);
      });
    });
  }  

  private valorUnico(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
      return new Promise(async resolve => {
        if (Validators.required(control) || this.id) return null;
        const id = control.value;
        const usuario = await this.obtener(id);
        if(usuario){
          resolve({ valorUnico: true });
        }
        return null;
        
      });
    }
  }

  private async presentAlert(titulo: string, mensaje: string, subtitulo?: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      subHeader: subtitulo,
      buttons: ['Aceptar']
    });

    alert.present();
  }

}
