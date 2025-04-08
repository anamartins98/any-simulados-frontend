import { Routes } from '@angular/router';
import { ConsultarComponent } from './feature/questoes/consultar/consultar.component';
import { CadastrarComponent } from './feature/questoes/cadastrar/cadastrar.component';

export const routes: Routes = [
    { path: 'questoes/consultar', component: ConsultarComponent },
    { path: 'questoes/cadastrar', component: CadastrarComponent  }
];
