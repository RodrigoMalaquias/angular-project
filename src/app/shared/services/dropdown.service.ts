import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBr } from '../models/estados-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadosBr[]>('assets/dados/estadosbr.json');
  }

  // getCargos(){
  //   return [
  //     { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
  //     { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
  //     { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
  //   ];
  // }

  getInscricao(){
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' }
    ]
  }

}
