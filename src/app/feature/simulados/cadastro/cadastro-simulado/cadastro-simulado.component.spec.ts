import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSimuladoComponent } from './cadastro-simulado.component';

describe('CadastroSimuladoComponent', () => {
  let component: CadastroSimuladoComponent;
  let fixture: ComponentFixture<CadastroSimuladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroSimuladoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroSimuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
