import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatDividerModule
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent {
  form: FormGroup;

  get alternativas(): FormArray {
    return this.form.get('alternativas') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      enunciado: ['', Validators.required],
      quantidade: [2, [Validators.required, Validators.min(2)]],
      alternativas: this.fb.array([])
    });

    this.form.get('quantidade')?.valueChanges.subscribe(qtd => {
      this.atualizarAlternativas(qtd);
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
      console.log('Formulário enviado:', dados);
      
      await this.salvarQuestao(dados);
    } else {
      console.log('Formulário inválido: ');
      this.form.markAllAsTouched();
    }
  }  

  async salvarQuestao(dados: any) {
    console.log(dados)
  }
}
