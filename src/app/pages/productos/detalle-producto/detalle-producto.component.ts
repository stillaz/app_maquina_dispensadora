import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  ngOnInit() {}

  cerrar(){
    this.modalController.dismiss();
  }

  guardar(){
    const producto: Producto = this.formulario.value;
    this.formulario.controls.id.enable;
    if(this.id){
      
    }else{
      this.productoService.registrar(producto);
      this.presentToast('Se ha registrado el producto correctamente');
    }
  }

  private async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message:mensaje,
      duration:3000
    });
    toast.present();
  }

}
