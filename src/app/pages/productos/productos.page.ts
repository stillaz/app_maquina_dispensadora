import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[];

  constructor(
    private modalController:ModalController,
    private productoService:ProductoService
  ) { }

  ngOnInit() {
    this.cargar();
  }

  async registrar(){
    const  modal = await this.modalController.create({
      component:DetalleProductoComponent
    });

    modal.onDidDismiss().then(() => {
      console.log('carga los productos');
      this.cargar();
    });
    modal.present();
  }

  private cargar(){
    this.productos = this.productoService.productos;
  }

  async ver(id:string){
    const modal = await this.modalController.create({
      component:DetalleProductoComponent,
      componentProps:{
        id:id
      }
    });
    modal.present();
  }

}
