import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: Usuario[];
  id_ubicacion: string;

  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.cargar();
  }

  async registrar() {
    const modal = await this.modalController.create({
      component: DetalleUsuarioComponent,
      componentProps: {
        id_ubicacion: this.id_ubicacion
      }
    });

    modal.present();
  }

  private cargar() {
    this.usuarioService.usuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  async ver(id: string) {
    const modal = await this.modalController.create({
      component: DetalleUsuarioComponent,
      componentProps: {
        id: id,
        id_ubicacion: this.id_ubicacion
      }
    });
    modal.present();
  }

}
