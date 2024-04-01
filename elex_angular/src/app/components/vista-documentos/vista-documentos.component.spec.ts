import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDocumentosComponent } from './vista-documentos.component';

describe('VistaDocumentosComponent', () => {
  let component: VistaDocumentosComponent;
  let fixture: ComponentFixture<VistaDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
