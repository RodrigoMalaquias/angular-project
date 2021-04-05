import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren:() => import("./home/home.module").then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren:() => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'professor',
    loadChildren:() => import("./professor/professor.module").then(m => m.ProfessorModule)
  },
  {
    path: 'aluno',
    loadChildren:() => import("./aluno/aluno.module").then(m => m.AlunoModule)
  },
  { 
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren:() => import("./pagina-nao-encontrada/pagina-nao-encontrada.module").then(m => m.PaginaNaoEncontradaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
