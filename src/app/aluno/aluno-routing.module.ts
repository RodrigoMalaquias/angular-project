import { AlunoComponent } from './aluno.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoResolverGuard } from '../guards/aluno-resolver.guard';
import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';


const routes: Routes = [
  {
    path: "",
    component: AlunoComponent
  },
  {
    path: "novo",
    component: AlunoComponent,
    resolve: {
      aluno: AlunoResolverGuard
    }
  },
  {
    path: "editar/:id",
    component: AlunoComponent,
    resolve: {
      aluno: AlunoResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
