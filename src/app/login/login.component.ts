import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  login: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  fazerLogin(){
    //console.log(this.usuario);

    this.login = this.authService.fazerLogin(this.usuario);
  }

  validadeLogin(){
    if(!this.login){
      return "is-invalid";
    }
  }

}
