import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaActuacionesComponent } from './vista-actuaciones.component';

describe('VistaActuacionesComponent', () => {
  let component: VistaActuacionesComponent;
  let fixture: ComponentFixture<VistaActuacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaActuacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaActuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
