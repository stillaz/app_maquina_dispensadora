import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController, AlertController, NavController } from '@ionic/angular';
import { MaquinaService } from 'src/app/services/maquina.service';
import { Maquina } from 'src/app/interfaces/maquina';
import { TipoMaquina } from '../../../enums/tipo-maquina.enum';

@Component({
  selector: 'app-detalle-maquina',
  templateUrl: './detalle-maquina.component.html',
  styleUrls: ['./detalle-maquina.component.scss'],
})
export class DetalleMaquinaComponent implements OnInit {

  formulario: FormGroup;
  id: string;
  tipoMaquina = [TipoMaquina.BEBIDAS, TipoMaquina.MECATOS];
  existe = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private maquinaService: MaquinaService,
    private toastController: ToastController,
    private alertController: AlertController,
    private navController: NavController
  ) { }

  async ngOnInit() {
    let maquina = {} as Maquina;
    if (this.id) {
      maquina = await this.obtener();
      this.existe = Boolean(maquina.id);
    }

    this.formulario = this.formBuilder.group({
      id: [{ value: maquina.id, disabled: this.id }, Validators.required],
      activo: [maquina.activo, Validators.required],
      tipo: [maquina.tipo, Validators.required],
      lugar: [maquina.lugar],
      ubicacion: [maquina.ubicacion],
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  guardar() {
    const maquina: Maquina = this.formulario.value;

    if (this.id) {
      this.maquinaService.modificar(this.id, maquina).then(() => {
        this.presentToast('se ha actualizado correctamente');
        this.cerrar();
      }).catch(err => this.presentAlert('Actualizar máquina', err, 'No se pudo actualizar la máquina'));
    } else {
      this.maquinaService.registrar(maquina).then(() => {
        this.presentToast('se ha guardado correctamente');
        this.cerrar();
      }).catch(err => this.presentAlert('Registrar máquina', err, 'No se pudo registrar la máquina'));
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

  private async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });

    toast.present();
  }

  generarId() {
    const id = this.maquinaService.id();
    console.log(id)
    this.formulario.patchValue({ id: id });
  }

  private obtener() {
    return new Promise<Maquina>(resolve => {
      this.maquinaService.encontrar(this.id).subscribe(maquina => {
        resolve(maquina);
      });
    });
  }

  eliminar() {
    this.maquinaService.eliminar(this.id).then(() => {
      this.presentToast('se ha eliminado correctamente');
      this.cerrar();
    }).catch(err => this.presentAlert('Eliminar máquina', err, 'No se pudo eliminar la máquina'));
  }

  productos() {
    this.cerrar();
    this.navController.navigateForward(`productos/${this.id}`);
  }

}
