import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTiposExpedientesComponent } from './vista-tipos-expedientes.component';

describe('VistaTiposExpedientesComponent', () => {
  let component: VistaTiposExpedientesComponent;
  let fixture: ComponentFixture<VistaTiposExpedientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaTiposExpedientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaTiposExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
