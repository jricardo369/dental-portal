import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeViajeComponent } from './tipos-de-viaje.component';

describe('TiposDeViajeComponent', () => {
  let component: TiposDeViajeComponent;
  let fixture: ComponentFixture<TiposDeViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposDeViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDeViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
