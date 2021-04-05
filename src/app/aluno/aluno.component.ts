import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EstadosBr } from '../shared/models/estados-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormValidations } from '../shared/form-validations';


@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styleUrls: ["./aluno.component.scss"],
})
export class AlunoComponent implements OnInit {
  alunoForm: FormGroup;

  estados: Observable<EstadosBr[]>;
  // cargos: any[];
  habilitacaoConfirm: any[];
  dataZerada: string = "";
  informarErro : boolean = false;
  

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit(): void {
    // this.dropdownService.getEstadosBr()
    //   .subscribe(dados => this.estados = dados);
    //   console.log();

    this.estados = this.dropdownService.getEstadosBr();
    // this.cargos = this.dropdownService.getCargos();
    this.habilitacaoConfirm = this.dropdownService.getHabilitacao();

    this.alunoForm = this.formBuilder.group({
      nome: ["", [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirmaEmail: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      habilitacaoConfirm: ["s"],
      // termos: [null, Validators.pattern()]
    });
  }

  onSubmit() {
    if (this.alunoForm.valid) {
      this.http
        .post("https://httpbin.org/post", JSON.stringify(this.alunoForm.value))
        .pipe(map((dados) => dados))
        .subscribe(
          (dados) => {
            console.log(dados);
            //this.alunoForm.reset();
          },
          (error: any) => alert("erro")
        );
      //resetando o formulario);
    } else {
      console.log("Formulario Invalido");
      this.verificaValidacoesForm(this.alunoForm);
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
}
