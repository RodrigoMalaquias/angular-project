import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly API = `${environment.API}aluno`;

  constructor(private http : HttpClient) { }

  list(){
    return this.http.get<aluno[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log),
    );
  }

  private create(aluno) {
    return this.http.post(this.API, aluno).pipe(take(1));
  }

  loadById(id){
    return this.http.get<aluno>(`${this.API}/${id}`).pipe(take(1));
  }

  private update(aluno){
    return this.http.put(`${this.API}/${aluno.id}`, aluno).pipe(take(1));
  }

  save(aluno){
    if(aluno.id){
      return this.update(aluno);
    }
    return this.create(aluno);
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
