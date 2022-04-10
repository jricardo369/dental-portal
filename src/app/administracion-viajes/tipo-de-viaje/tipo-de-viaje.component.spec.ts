import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeViajeComponent } from './tipo-de-viaje.component';

describe('TipoDeViajeComponent', () => {
  let component: TipoDeViajeComponent;
  let fixture: ComponentFixture<TipoDeViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
