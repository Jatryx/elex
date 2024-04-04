import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRelacionExpedienteComponent } from './vista-relacion-expediente.component';

describe('VistaRelacionExpedienteComponent', () => {
  let component: VistaRelacionExpedienteComponent;
  let fixture: ComponentFixture<VistaRelacionExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaRelacionExpedienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaRelacionExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
