import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorListaRoutingModule } from './professor-lista-routing.module';
import { ProfessorListaComponent } from './professor-lista.component';
import { ProfessorModule } from '../professor.module';


@NgModule({
  declarations: [ProfessorListaComponent],
  imports: [
    CommonModule,
    ProfessorListaRoutingModule,
  ]
})
export class ProfessorListaModule { }
