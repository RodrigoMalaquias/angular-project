import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


import { map, switchMap } from 'rxjs/operators';
import { professor } from './professor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { ProfessorService } from './professor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  bsModalRef: BsModalRef;
  idRota: string = ""
  professor: professor = {
    id: null,
    nome: null,
    email: null
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private modalService: BsModalService,
    private service: ProfessorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.idRota = this.route.snapshot.paramMap.get('id'))
    console.log(this.idRota = this.route.snapshot.paramMap.get('email'))
  }


  onSubmit(formulario) {
    console.log(formulario.id);
      this.service.save(formulario, this.idRota).subscribe(
        success =>{
          this.handleSucess();
          this.router.navigateByUrl("/professor-lista")
        }
      );
  }

  resetar(formulario) {
    formulario.form.reset();
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro de execução, tente novamente!';
  }

  handleSucess(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'success';
    this.bsModalRef.content.message = 'Execução Completa!';
  }

}
