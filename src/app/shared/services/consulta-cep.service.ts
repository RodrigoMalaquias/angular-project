import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient
  ) { }

  consultaCEP(cep: string) {

    cep = cep.replace(/\D/g, '');
    
    if (cep != null && cep !== '') {

      return this.http.get(`//viacep.com.br/ws/${cep}/json`);
    }

    //Retornar algo caso o cep seja valido ou nao
    return of({})
  }

}
