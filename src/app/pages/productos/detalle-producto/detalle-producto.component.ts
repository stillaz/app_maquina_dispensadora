import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {

  formulario: FormGroup;
  id:string;

  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder,
    private productoService:ProductoService,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    const producto = this.id ? this.productoService.encontrar(this.id) || {} as Producto : {} as Producto;
    console.log(producto);
    this.formulario = this.formBuilder.group({
      id:[producto.id, Validators.required],
      nombre:[producto.nombre, Validators.required],
      precio:[producto.precio, Validators.required],
      cantidad:[producto.cantidad, Validators.required],
      activo:[producto.activo],
      alerta:[producto.alerta],
      actualizacion:[producto.actualizacion.toISOString()],
      estadoInventario:[producto.estadoinventario],
      fechaInventario:[producto.fechainventario.toISOString()],
      imagen:[producto.imagen]
    });
  }

  cerrar(){
    this.modalController.dismiss();
  }

  guardar(){
    const producto: Producto = this.formulario.value;
    this.formulario.controls.id.enable;
    if(this.id){
      this.productoService.modificar(this.id, producto);
      this.presentToast('Se ha actualizado el producto correctamente.');
    }else{
      this.productoService.registrar(producto);
      this.presentToast('Se ha registrado el producto correctamente');
    }
    this.cerrar();
  }

  private async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message:mensaje,
      duration:3000
    });
    toast.present();
  }

  eliminar(){
    this.productoService.eliminar(this.id);
    this.presentToast('Se ha eliminado el producto.');
    this.cerrar();
  }

}
