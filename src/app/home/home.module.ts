import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetalleMaquinaComponent } from './detalle-maquina/detalle-maquina.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [HomePage, DetalleMaquinaComponent],
  entryComponents: [DetalleMaquinaComponent],
  exports: [
    ReactiveFormsModule
  ]
})
export class HomePageModule {}
