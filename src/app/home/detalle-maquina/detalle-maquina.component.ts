import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { MaquinaService } from 'src/app/services/maquina.service';
import { Maquina } from 'src/app/interfaces/maquina';

@Component({
  selector: 'app-detalle-maquina',
  templateUrl: './detalle-maquina.component.html',
  styleUrls: ['./detalle-maquina.component.scss'],
})
export class DetalleMaquinaComponent implements OnInit {


  formulario: FormGroup;
  id: string;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private maquinaService: MaquinaService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    console.log(this.id);
    const maquina = this.id ? this.maquinaService.encontrar(this.id) || {}  as Maquina : {} as Maquina;
    this.formulario = this.formBuilder.group({
      id: [ maquina.id , Validators.required],
      activo: [maquina.activo, Validators.required],
      actualizacion: [maquina.actualizacion, Validators.required],
      alerta: [maquina.alerta, Validators.required],
      estado: [maquina.estado,  Validators.required],
      tipo: [maquina.tipo,  Validators.required],
      lugar: [maquina.lugar,  Validators.required],
      ubicacion: [maquina.ubicacion,  Validators.required],
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  guardar() {
    const maquina: Maquina = this.formulario.value;
    maquina.id = this.id;

    if(this.id){
      this.maquinaService.modificar(this.id, maquina);
      this.presentToast('se ha actualizado correctamente');
    }else{
      this.maquinaService.registrar(maquina);
      this.presentToast('se ha guardado correctamente');
    }
    this.cerrar(); 
  }

  private async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });

    toast.present();
  }

}
