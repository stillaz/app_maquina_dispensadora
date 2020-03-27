import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinaPage } from './maquina.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinaPageRoutingModule {}
