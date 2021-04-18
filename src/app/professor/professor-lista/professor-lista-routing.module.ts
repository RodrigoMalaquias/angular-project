import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorComponent } from '../professor.component';
import { ProfessorListaComponent } from './professor-lista.component';


const routes: Routes = [
  {
    path: "",
    component: ProfessorListaComponent
  },
  {
    path: "editar-professor/:id",
    component: ProfessorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorListaRoutingModule { }
