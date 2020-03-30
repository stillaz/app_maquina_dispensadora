import { Component, OnInit } from '@angular/core';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { ModalController } from '@ionic/angular';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DetalleUbicacionComponent } from './detalle-ubicacion/detalle-ubicacion.component';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  ubicacion: Ubicacion[];

  constructor(private modalController: ModalController, private ubiacionService: UbicacionService ) { }

  ngOnInit() {
    this.cargar();
  }

  async registrar() {
    const modal = await this.modalController.create({
      component: DetalleUbicacionComponent
    });

    modal.present();
  }

  private cargar() {
    this.ubiacionService.ubicacion().subscribe(ubicacion => {
      this.ubicacion = ubicacion;
    });
  }

  async ver(id: string) {
    const modal = await this.modalController.create({
      component: DetalleUbicacionComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
