import { Injectable } from '@angular/core';
import { Maquina } from '../interfaces/maquina';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  maquinas: Maquina[] = [
    {id: '1',
    activo: true,
    actualizacion: null ,
    alerta: true,
    estado: 'buena',
    tipo: 'gaseosas',
    lugar: '3 piso',
    ubicacion: 'Mayorca'},
  ];

  constructor() { }

  encontrar(id: string){
    return this.maquinas.find(maquinas => maquinas.id === id);
  }

  registrar(maquina: Maquina){
    this.maquinas.push(maquina);
    console.log(this.maquinas);
  }

  modificar(id: string, maquina: Maquina){
    const index = this.maquinas.findIndex(maquina => maquina.id === id);
    this.maquinas.splice(index, 1, maquina);
  }

  eliminar(id: string){
    const index = this.maquinas.findIndex(maquina => maquina.id === id);
    this.maquinas.splice(index, 1);
  }

}
