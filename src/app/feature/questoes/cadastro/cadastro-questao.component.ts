import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../api.service';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { LayoutBasicoComponent } from '../../../compartilhado/layout-basico/layout-basico.component';

@Component({
  selector: 'app-cadastro-questao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    LayoutBasicoComponent,
    MatIconModule
  ],
  templateUrl: './cadastro-questao.component.html',
  styleUrl: './cadastro-questao.component.scss'
})
export class CadastroQuestaoComponent {
  form: FormGroup;
  mensagemSucesso: boolean = false;
  mensagemFalha: boolean = false;

  get alternativas(): FormArray {
    return this.form.get('alternativas') as FormArray;
  }

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.fb.group({
      enunciado: ['', Validators.required],
      quantidade: [2, [Validators.required, Validators.min(2)]],
      alternativas: this.fb.array([]),
      respostaCorreta: ['', [Validators.required, this.letraValidaValidator()]]
    });

    this.form.get('quantidade')?.valueChanges.subscribe(qtd => {
      this.atualizarAlternativas(qtd);
      this.form.get('respostaCorreta')?.updateValueAndValidity();
    });

    // Inicializa com 2 alternativas
    this.atualizarAlternativas(2);
  }

  private criarAlternativa(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required]
    });
  }

  private atualizarAlternativas(qtd: number): void {
    const alternativas = this.alternativas;
    while (alternativas.length < qtd) {
      alternativas.push(this.criarAlternativa());
    }
    while (alternativas.length > qtd) {
      alternativas.removeAt(alternativas.length - 1);
    }
  }

  onWheel(event: WheelEvent): void {
    (event.target as HTMLElement).blur(); // Remove o foco do input
    event.preventDefault(); // Impede o scroll de alterar o valor
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const dados = this.form.value;
      const dadosTransformados = this.transformarDadosFormulario(dados);
      console.log('Formulário enviado:', dadosTransformados);
      await this.salvarQuestao(dadosTransformados);
    } else {
      console.log('Formulário inválido: ');
      this.form.markAllAsTouched();
    }
  }  

  async salvarQuestao(dados: any) {
    try {
      const response = await firstValueFrom(this.apiService.post('questoes', dados));
      console.log('Questão salva com sucesso:', response);

      this.resetForm();
      this.mensagemSucesso = true;
      setTimeout(() => {
        this.mensagemSucesso = false;
      }, 5000);

    } catch (error) {
      console.error('Erro ao salvar a questão:', error);
      this.mensagemFalha = true;
      setTimeout(() => {
        this.mensagemFalha = false;
      }, 5000);
    }
  }

  transformarDadosFormulario(dadosForm: any): any {
    return {
      enunciado: dadosForm.enunciado,
      quantidade: dadosForm.quantidade,
      questaoAtiva: true,
      alternativas: dadosForm.alternativas.map((alt: any) => alt.texto),
      respostaCorreta: dadosForm.respostaCorreta.toUpperCase()
    };
  }

  getLetraAlternativa(index: number): string {
    return String.fromCharCode(65 + index); // 65 = A, 66 = B, ...
  }

  getLetraAlternativaMaxima(): string {
    const quantidade = this.form.get('quantidade')?.value;
    if (!quantidade || quantidade < 1) return 'A';
    return String.fromCharCode(65 + quantidade - 1);
  }  

  letraValidaValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const letra = control.value?.toUpperCase();
      const quantidade = this.form?.get('quantidade')?.value;

      if (!letra || !quantidade) return null;

      const codigoLetra = letra.charCodeAt(0);
      const codigoMaximo = 65 + quantidade - 1; // 65 é "A"

      const valido = codigoLetra >= 65 && codigoLetra <= codigoMaximo;

      return valido ? null : { letraInvalida: true };
    };
  }

  get respostaCorreta() {
    return this.form.get('respostaCorreta');
  }
  
  resetForm(): void {
    this.form.patchValue({
      enunciado: '',
      respostaCorreta: ''
    });
  
    const alternativas = this.form.get('alternativas') as FormArray;
    while (alternativas.length > 0) {
      alternativas.removeAt(0);
    }
  
    // Sobe a quantidade para forçar recriação visual
    this.form.get('quantidade')?.setValue(3);
  
    // Depois de um ciclo do JavaScript, volta pra 2 pra restaurar o padrão
    setTimeout(() => {
      this.form.get('quantidade')?.setValue(2);
    }, 0);
  }
}