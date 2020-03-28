import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[];
  id_maquina: string;

  constructor(
    private modalController: ModalController,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id_maquina = this.activatedRoute.snapshot.params.idmaquina;
    this.cargar();
  }

  async registrar() {
    const modal = await this.modalController.create({
      component: DetalleProductoComponent,
      componentProps: {
        id_maquina: this.id_maquina
      }
    });

    modal.present();
  }

  private cargar() {
    this.productoService.productos(this.id_maquina).subscribe(productos => {
      this.productos = productos;
    });
  }

  async ver(id: string) {
    const modal = await this.modalController.create({
      component: DetalleProductoComponent,
      componentProps: {
        id: id,
        id_maquina: this.id_maquina
      }
    });
    modal.present();
  }

}
