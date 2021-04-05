import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada-routing.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


@NgModule({
  declarations: [PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    PaginaNaoEncontradaRoutingModule
  ]
})
export class PaginaNaoEncontradaModule { }
