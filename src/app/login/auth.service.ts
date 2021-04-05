import { Injectable } from '@angular/core';

import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario){

    if(usuario.nome == "concert" && usuario.senha == "prova"){

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);

    }else{
      this.usuarioAutenticado = false;
      
      this.mostrarMenuEmitter.emit(false);

      return this.usuarioAutenticado;
    }

  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
