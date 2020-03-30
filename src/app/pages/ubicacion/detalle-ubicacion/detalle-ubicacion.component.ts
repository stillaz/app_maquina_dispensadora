import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ubicacion } from 'src/app/interfaces/ubicacion';

@Component({
  selector: 'app-detalle-ubicacion',
  templateUrl: './detalle-ubicacion.component.html',
  styleUrls: ['./detalle-ubicacion.component.scss'],
})
export class DetalleUbicacionComponent implements OnInit {

  formulario: FormGroup;
  id: string;
  existe = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private ubicacionService: UbicacionService,
    private toastController: ToastController,
    private alertController: AlertController,
    private navController: NavController
  ) { }

  async ngOnInit() {
    let ubicacion = {} as Ubicacion;
    if (this.id) {
      ubicacion = await this.obtener();
      this.existe = Boolean(ubicacion.id);
    }

    this.formulario = this.formBuilder.group({
      id: [{ value: ubicacion.id, disabled: this.id }],
      direccion: [ubicacion.direccion],
      nombre: [ubicacion.nombre ],
      telefono: [ubicacion.telefono],
      lat: [ubicacion.coordenadas[0].lat],
      long: [[ubicacion.coordenadas]],
      imagen: [ubicacion.imagen]
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  guardar() {
    const ubicacion: Ubicacion = this.formulario.value;

    if (this.id) {
      this.ubicacionService.modificar(this.id, ubicacion).then(() => {
        this.presentToast('se ha actualizado correctamente');
        this.cerrar();
      }).catch(err => this.presentAlert('Actualizar ubicación', err, 'No se pudo actualizar la ubicación'));
    } else {
      this.ubicacionService.registrar(ubicacion).then(() => {
        this.presentToast('se ha guardado correctamente');
        this.cerrar();
      }).catch(err => this.presentAlert('Registrar ubicación', err, 'No se pudo registrar la ubicación'));
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
    const id = this.ubicacionService.id();
    console.log(id)
    this.formulario.patchValue({ id: id });
  }

  private obtener() {
    return new Promise<Ubicacion>(resolve => {
      this.ubicacionService.encontrar(this.id).subscribe(ubicacion => {
        resolve(ubicacion);
      });
    });
  }

  eliminar() {
    this.ubicacionService.eliminar(this.id).then(() => {
      this.presentToast('se ha eliminado correctamente');
      this.cerrar();
    }).catch(err => this.presentAlert('Eliminar ubicación', err, 'No se pudo eliminar la ubicación'));
  }

  productos() {
    this.cerrar();
    this.navController.navigateForward(`ubicacion/${this.id}`);
  }


  async imagen() {
    const idUbicacion = this.formulario.value.id;
    const modal = await this.modalController.create({
      component: FotoPage,
      componentProps: {
        path: `ubicacion/${idUbicacion}`
      }
    });

    modal.onDidDismiss().then(res => {
      const data = res.data;
      if (data)
        this.formulario.patchValue({ imagen: data.path });
    });

    modal.present();
  }

}
