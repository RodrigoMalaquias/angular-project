import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { aluno } from '../aluno';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-lista',
  templateUrl: './aluno-lista.component.html',
  styleUrls: ['./aluno-lista.component.scss'],
  preserveWhitespaces: true
})
export class AlunoListaComponent implements OnInit {

  // alunos: aluno[];


  alunos$: Observable<aluno[]>;
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal; //Referencia ao que esta no teamplate html

  alunoSelecionado: aluno;

  constructor(private service: AlunoService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.alunos = dados);
    //Mostrando os alunos na tabela
    this.alunos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);s
        this.handleError();
        return of();
      })
    )
  }

  onRefresh() {
    this.alunos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return empty();
      })
    );
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar alunos, Tente depois!';
  }

  onEdit(id){
    this.router.navigate(['editar-aluno',id] ,{ relativeTo: this.route })
  }

  onDelete(aluno){
    this.alunoSelecionado = aluno;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    this.service.remove(this.alunoSelecionado.id).subscribe(
      success => {
        this.onRefresh(),
        this.deleteModalRef.hide();
      },
      error => {
        this.deleteModalRef.content.message = 'Erro ao remover curso, Tente depois!',
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
