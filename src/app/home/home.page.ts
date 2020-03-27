import { Component, OnInit } from '@angular/core';
import { Maquina } from '../interfaces/maquina';
import { ModalController } from '@ionic/angular';
import { MaquinaService } from '../services/maquina.service';
import { DetalleMaquinaComponent } from './detalle-maquina/detalle-maquina.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {
  maquinas: Maquina[];

  constructor(private modalController: ModalController, private maquinaService: MaquinaService ) {}
    ngOnInit() {
      this.cargar();
    }

    async registrar(){
      const modal = await this.modalController.create({
        component: DetalleMaquinaComponent
      });

      modal.onDidDismiss().then(() =>{
        this.cargar();
      });

      modal.present();
    }

    private cargar(){
      this.maquinas = this.maquinaService.maquinas;
    }

    async ver(id: string){
      const modal = await this.modalController.create({
        component: DetalleMaquinaComponent,
        componentProps: {
          id
        }
      });
      modal.present();
    }

}
