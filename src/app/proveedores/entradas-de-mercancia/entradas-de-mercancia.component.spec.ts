import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasDeMercanciaComponent } from './entradas-de-mercancia.component';

describe('EntradasDeMercanciaComponent', () => {
  let component: EntradasDeMercanciaComponent;
  let fixture: ComponentFixture<EntradasDeMercanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradasDeMercanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasDeMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
