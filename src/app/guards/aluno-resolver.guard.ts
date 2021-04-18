import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { aluno } from '../aluno/aluno';
import { AlunoService } from '../aluno/aluno.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolverGuard implements Resolve<aluno> {

  constructor(private service: AlunoService){

  }
  
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<aluno>{
    
    if(route.params && route.params['id']){
  
      return this.service.loadById(route.params['id']);
    }

    //of retorna um observable a partir de um objeto
    return of({
      id: null,
      nome: null,
      email: null
    });

  }

}
