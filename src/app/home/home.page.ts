import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LogueoService } from '../services/logueo.service';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  usuario_logueado: Usuario;

  constructor(
    private navController: NavController,
    private logueoService: LogueoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.obtenerUsuarioLogueado();
  }

  ir(page: string) {
    this.navController.navigateForward(page);
  }

  cerrar() {
    this.logueoService.desloguear();
  }

  obtenerUsuarioLogueado() {
    this.logueoService.usuario().subscribe(user => {
      this.usuarioService.encontrar(user.email).subscribe(usuario => {
        this.usuario_logueado = usuario;
      });
    });
  }
}
