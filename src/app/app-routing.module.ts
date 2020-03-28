import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  {
    path: 'maquinas',
    loadChildren: () => import('./pages/maquina/maquina.module').then(m => m.MaquinaPageModule)
  },
  { path: 'productos/:idmaquina', loadChildren: './pages/productos/productos.module#ProductosPageModule' },
  { path: 'productos', loadChildren: './pages/productos/productos.module#ProductosPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
