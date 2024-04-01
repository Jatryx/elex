import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaExpedientesComponent } from './vista-expedientes.component';

describe('VistaExpedientesComponent', () => {
  let component: VistaExpedientesComponent;
  let fixture: ComponentFixture<VistaExpedientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaExpedientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
