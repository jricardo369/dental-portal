import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoCajaComponent } from './gasto-caja.component';

describe('GastoCajaComponent', () => {
  let component: GastoCajaComponent;
  let fixture: ComponentFixture<GastoCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
