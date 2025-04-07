import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorQuestoesComponent } from './gerenciador-questoes.component';

describe('GerenciadorQuestoesComponent', () => {
  let component: GerenciadorQuestoesComponent;
  let fixture: ComponentFixture<GerenciadorQuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciadorQuestoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciadorQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
