import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { professor } from '../professor';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-lista',
  templateUrl: './professor-lista.component.html',
  styleUrls: ['./professor-lista.component.scss']
})
export class ProfessorListaComponent implements OnInit {

  professorSelecionado : professor;

  professores$: Observable<professor[]>;
  error$ = new Subject<boolean>();
  deleteModalRef: BsModalRef;
  bsModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal; //Referencia ao que esta no teamplate html

  constructor(
    private service: ProfessorService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.professores$ = this.service.list()
  }

  onRefresh() {
    this.professores$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return empty();
      })
    );
  }

  onEdit(id){
    this.router.navigate(['editar-professor',id] ,{ relativeTo: this.route })
  }

  onDelete(aluno){
    this.professorSelecionado = aluno;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    this.service.remove(this.professorSelecionado.id).subscribe(
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

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar alunos, Tente depois!';
  }
}
