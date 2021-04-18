import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { professor } from './professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private readonly API = `${environment.API}professor`;

  constructor(private http : HttpClient) {}

  list(){
    return this.http.get<professor[]>(this.API)
    .pipe(
      delay(2000)
    );
  }

  create(professor) {
    return this.http.post(this.API, professor).pipe(take(1));
  }

  loadById(id){
    return this.http.get<professor>(`${this.API}/${id}`).pipe(take(1));
  }

  private update(professor, id){
    return this.http.put(`${this.API}/${id}`, professor).pipe(take(1));
  }

  save(professor,id){
    console.log("se liga")
    console.log(professor)
    if(id){
      console.log("entrou if")
      return this.update(professor,id); 
    }
    console.log("não if")
    return this.create(professor);
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
    
}

