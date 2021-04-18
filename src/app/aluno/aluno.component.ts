import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { EstadosBr } from '../shared/models/estados-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormValidations } from '../shared/form-validations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from './aluno.service';
import { aluno } from './aluno';



@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styleUrls: ["./aluno.component.scss"],
})
export class AlunoComponent implements OnInit {
  alunoForm: FormGroup;

  estados: Observable<EstadosBr[]>;
  // cargos: any[];
  inscricaoConfirm: any[];
  dataZerada: string = "";
  informarErro : boolean = false;
  bsModalRef: BsModalRef;
  teste : boolean = false;
  

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router
  ) {}

  ngOnInit(): void {


    // this.route.params.subscribe
    // (
    //   (params : any)=>{
    //     const id = params['id'];
    //     console.log(id);
    //     const aluno$ = this.alunoService.loadById(id);
    //     aluno$.subscribe(aluno => {
    //       this.updateForm(aluno);
    //     });
    //   }
    // )

      //Buscará o id apenas quando se tratar de uma pagina de atualização
      if(this.router.url != "/aluno"){
        console.log(this.router.url);
        this.route.params.pipe(
          map((params: any) => params['id']),
          switchMap(id => this.alunoService.loadById(id))
        ).subscribe
        (
          aluno => this.updateForm(aluno));
      }
      
    
    
    

    // this.dropdownService.getEstadosBr()
    //   .subscribe(dados => this.estados = dados);
    //   console.log();

    this.estados = this.dropdownService.getEstadosBr();
    // this.cargos = this.dropdownService.getCargos();
    this.inscricaoConfirm = this.dropdownService.getInscricao();

    // const aluno = this.route.snapshot.data['aluno'];

    this.alunoForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      requisitos: this.formBuilder.group({
        inscricao: [null, Validators.required],
        date: [null, Validators.required],
        habilidade: [null],
        habilidade2: [null],
        habilidade3: [null]
      }),
      termos: this.formBuilder.group({
        termos: ['null',Validators.required]
      })
    });
    console.log(this.alunoForm.value.id);
  }

  updateForm(aluno){
    console.log(aluno.endereco.cep);
    this.alunoForm.patchValue({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      endereco: ({
        cep: aluno.endereco.cep,
        numero: aluno.endereco.numero,
        complemento: aluno.endereco.complemento,
        rua: aluno.endereco.rua,
        bairro: aluno.endereco.bairro,
        cidade: aluno.endereco.cidade,
        estado: aluno.endereco.estado
      }),
      requisitos: ({
        inscricao: aluno.requisitos.inscricao,
        date: aluno.requisitos.date,
        habilidade: aluno.requisitos.habilidade,
        habilidade2: aluno.requisitos.habilidade2,
        habilidade3: aluno.requisitos.habilidade3
      }),
      termos: ({
        termos: aluno.termos.termos
      })
    })
  }

  onSubmit() {
    if (this.alunoForm.valid && this.alunoForm) {
      this.alunoService.save(this.alunoForm.value).subscribe(
        succes =>{
          this.handleSucess();
          this.router.navigateByUrl("/aluno-lista")
        }
      );
      // if(this.alunoForm.value.id){
      //   console.log("pegou id");
      //   //update
      //   this.alunoService.update(this.alunoForm.value).subscribe(
      //     success =>{
      //       this.handleSucess();
      //       this.router.navigateByUrl("/aluno-lista")
      //     }
      //   );
      // }else{
      //   this.alunoService.create(this.alunoForm.value).subscribe(
      //     success =>{
      //       this.handleSucess();
      //       this.router.navigateByUrl("/aluno-lista")
      //     }
      //   );
      // }
      
    } else {
      console.log("Formulario Invalido");
      this.verificaValidacoesForm(this.alunoForm);
      this.handleError();
    }
    console.log(this.alunoForm.value);
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.alunoForm.reset();
  }

  verificaValidTouched(campo) {
    return (
      this.alunoForm.get(campo).valid && this.alunoForm.get(campo).touched
    );
  }

  aplicaCssErro(campo: string) {
    if(this.verificaValidTouched(campo)){
      this.informarErro = false;
      return "is-valid";
    }
    else if(!this.verificaValidTouched(campo)){
      this.informarErro = true;
      return "is-invalid";
    }
  }

  consultaCEP() {
    let cep = this.alunoForm.get("endereco.cep").value;

    if (cep != null && cep !== "") {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    this.alunoForm.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetaDadosForm() {
    this.alunoForm.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }


  requireMinCheckbox(min = 1){
    const validator = (formArray: FormArray) => {
      const totalCHecked = formArray.controls.
      map(v => v.value).reduce((total,current) => current ? total + current : total, 0);
      return totalChecked => min ? null : { required : true };
    }
    return validator;
  };

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
