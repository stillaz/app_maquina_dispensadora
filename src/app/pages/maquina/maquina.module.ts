import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinaPageRoutingModule } from './maquina-routing.module';

import { MaquinaPage } from './maquina.page';
import { DetalleMaquinaComponent } from './detalle-maquina/detalle-maquina.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MaquinaPage, DetalleMaquinaComponent],
  entryComponents:[DetalleMaquinaComponent]
})
export class MaquinaPageModule {}
