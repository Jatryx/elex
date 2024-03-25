import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosTipoExpedienteComponent } from './formularios-tipo-expediente.component';

describe('FormulariosTipoExpedienteComponent', () => {
  let component: FormulariosTipoExpedienteComponent;
  let fixture: ComponentFixture<FormulariosTipoExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulariosTipoExpedienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulariosTipoExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
