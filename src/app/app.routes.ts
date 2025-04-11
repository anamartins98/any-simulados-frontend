import { Routes } from '@angular/router';
import { ConsultaQuestoesComponent } from './feature/questoes/consulta/consulta-questoes.component';
import { CadastroQuestaoComponent } from './feature/questoes/cadastro/cadastro-questao.component';
import { SimuladosComponent } from './feature/simulados/simulados.component';
import { CadastroSimuladoComponent } from './feature/simulados/cadastro/cadastro-simulado/cadastro-simulado.component';

export const routes: Routes = [
    { path: 'questoes/consultar', component: ConsultaQuestoesComponent },
    { path: 'questoes/cadastrar', component: CadastroQuestaoComponent  },
    { path: 'simulados/consultar', component: SimuladosComponent },
    { path: 'simulados/cadastrar', component: CadastroSimuladoComponent }
];
