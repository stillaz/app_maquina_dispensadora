import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosPage, DetalleProductoComponent],
  entryComponents:[DetalleProductoComponent]
})
export class ProductosPageModule {}
