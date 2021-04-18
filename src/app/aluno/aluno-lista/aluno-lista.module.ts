import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoListaRoutingModule } from './aluno-lista-routing.module';
import { AlunoListaComponent } from './aluno-lista.component';


@NgModule({
  declarations: [AlunoListaComponent],
  imports: [
    CommonModule,
    AlunoListaRoutingModule
  ]
})
export class AlunoListaModule { }
