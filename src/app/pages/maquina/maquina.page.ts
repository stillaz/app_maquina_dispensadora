import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaquinaService } from 'src/app/services/maquina.service';
import { DetalleMaquinaComponent } from './detalle-maquina/detalle-maquina.component';
import { Maquina } from 'src/app/interfaces/maquina';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.page.html',
  styleUrls: ['./maquina.page.scss'],
})
export class MaquinaPage implements OnInit {
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
