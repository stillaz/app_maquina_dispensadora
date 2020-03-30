import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { FotoPage } from '../../foto/foto.page';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {

  formulario: FormGroup;
  id: string;
  id_maquina: string;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    let producto = {} as Producto;
    if (this.id) {
      producto = await this.obtener(this.id);
    }

    this.formulario = this.formBuilder.group({
      id: [producto.id, Validators.required, this.valorUnico()],
      nombre: [producto.nombre, Validators.required],
      precio: [producto.precio, Validators.required],
      cantidad: [producto.cantidad, Validators.required],
      activo: [producto.activo],
      alerta: [producto.alerta],
      estado: [producto.estado],
      imagen: [producto.imagen]
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  guardar() {
    const producto: Producto = this.formulario.value;
    this.formulario.controls.id.enable;
    if (this.id) {
      this.productoService.modificar(this.id, producto, this.id_maquina).then(() => {
        this.presentToast('Se ha actualizado el producto correctamente.');
        this.cerrar();
      }).catch(err => this.presentAlert('Actualizar producto', err, 'No se pudo actualizar el producto'));;
    } else {
      this.productoService.registrar(producto, this.id_maquina).then(() => {
        this.presentToast('Se ha registrado el producto correctamente');
        this.cerrar();
      }).catch(err => this.presentAlert('Registrar producto', err, 'No se pudo registrar el producto'));;
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
    this.productoService.eliminar(this.id, this.id_maquina).then(() => {
      this.presentToast('Se ha eliminado el producto.');
      this.cerrar();
    }).catch(err => this.presentAlert('Eliminar producto', err, 'No se pudo eliminar el producto'));;
  }

  private obtener(id: string) {
    return new Promise<Producto>(resolve => {
      this.productoService.encontrar(id, this.id_maquina).subscribe(producto => {
        resolve(producto);
      });
    });
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

  async imagen() {
    const idproducto = this.formulario.value.id;
    const modal = await this.modalController.create({
      component: FotoPage,
      componentProps: {
        path: `prodcutos/${idproducto}`
      }
    });

    modal.onDidDismiss().then(res => {
      const data = res.data;
      if (data)
        this.formulario.patchValue({ imagen: data.path });
    });

    modal.present();
  }

  private valorUnico(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return new Promise(async resolve => {
        if (Validators.required(control) || this.id) return null;
        const id = control.value;
        const producto = await this.obtener(id);
        if (producto) {
          resolve({ valorUnico: true });
        }

        return null;
      });
    }
  }

}
