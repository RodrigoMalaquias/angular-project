import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoComponent } from '../aluno.component';
import { AlunoListaComponent } from './aluno-lista.component';


const routes: Routes = [
  {
    path: "",
    component: AlunoListaComponent
  }
  ,
  {
    path: "editar-aluno/:id",
    component: AlunoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoListaRoutingModule { }
