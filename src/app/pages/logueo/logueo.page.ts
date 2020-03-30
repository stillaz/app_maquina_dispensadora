import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { LogueoService } from 'src/app/services/logueo.service';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.page.html',
  styleUrls: ['./logueo.page.scss'],
})
export class LogueoPage implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private logueoService: LogueoService,
    private alertController: AlertController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logueo() {
    const usuario = this.formulario.value;
    this.logueoService.loguear(usuario.username, usuario.password).then(() => {
      this.navController.navigateRoot('/home');
    }).catch(err => {
      let mensajeError = err;
      switch (err.code) {
        case 'auth/user-not-found':
          mensajeError = 'El usuario no ha sido registrado en el sistema';
          break;

        case 'auth/wrong-password':
          mensajeError = 'La contraseña no es válida';
          break;
      }

      this.presentAlertErrorLogueo(mensajeError);
    });
  }

  private async presentAlertErrorLogueo(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error de logueo',
      subHeader: 'Los datos ingresados no son correctos',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.formulario.patchValue({ username: '', password: '' });
        }
      }]
    });

    alert.present();
  }

  async olvidoClave() {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: 'Para recuperar su contraseña por favor digite el correo electrónico.',
      inputs: [{
        name: 'correo_electronico',
        placeholder: 'uncorreo@dominio',
        type: 'email'
      }],
      buttons: [{
        text: 'Continuar',
        handler: data => {
          console.log(data);
          if (!data || !data.correo_electronico) {
            this.presentAlertRecuperacionCorreo('Recuperación de contraseña', 'Debes ingresar un correo válido.');
          } else {
            this.logueoService.recuperacion(data.correo_electronico).then(() => {
              this.presentAlertRecuperacionCorreo('Recuperación de contraseña', 'Hemos enviado un correo electrónico a su bandeja para los siguientes pasos.');
            }).catch(err => {
              this.presentAlertRecuperacionCorreo('Recuperación de contraseña', `${err}`);
            });
          }
        }
      }]
    });

    alert.present();
  }

  private async presentAlertRecuperacionCorreo(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [{
        text: 'Aceptar'
      }]
    });

    alert.present();
  }

}
