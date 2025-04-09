import { Component } from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

interface Questao {
  id: number;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: string;
}


@Component({
  selector: 'app-consultar',
  imports: [MatIconModule, CommonModule, MatFormFieldModule, FormsModule, MatDividerModule, MatInputModule],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.scss'
})
export class ConsultarComponent {
  filtroEnunciado: string = '';
  questoes: Questao[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAll<Questao[]>('questoes').subscribe((questoes) => {
      this.questoes = questoes;
    });
  }

  questoesFiltradas() {
    if (!this.filtroEnunciado) return this.questoes;
    return this.questoes.filter(q =>
      q.enunciado.toLowerCase().includes(this.filtroEnunciado.toLowerCase())
    );
  }

  getLetra(index: number): string {
    return String.fromCharCode(65 + index);
  }

  editar(questao: Questao) {
    // pode navegar pro componente de editar passando o id
  }

  excluir(questao: Questao) {
    // confirma e chama o service pra remover
  }

}
