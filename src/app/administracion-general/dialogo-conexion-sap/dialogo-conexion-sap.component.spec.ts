import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConexionSapComponent } from './dialogo-conexion-sap.component';

describe('DialogoConexionSapComponent', () => {
  let component: DialogoConexionSapComponent;
  let fixture: ComponentFixture<DialogoConexionSapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoConexionSapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoConexionSapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
