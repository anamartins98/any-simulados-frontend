import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaQuestoesComponent } from './consulta-questoes.component';

describe('ConsultaQuestoesComponent', () => {
  let component: ConsultaQuestoesComponent;
  let fixture: ComponentFixture<ConsultaQuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaQuestoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
