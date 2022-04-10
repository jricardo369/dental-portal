import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDeFacturasComponent } from './consulta-de-facturas.component';

describe('ConsultaDeFacturasComponent', () => {
  let component: ConsultaDeFacturasComponent;
  let fixture: ComponentFixture<ConsultaDeFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDeFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDeFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
