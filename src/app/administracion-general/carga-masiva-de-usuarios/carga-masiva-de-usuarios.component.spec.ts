import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMasivaDeUsuariosComponent } from './carga-masiva-de-usuarios.component';

describe('CargaMasivaDeUsuariosComponent', () => {
  let component: CargaMasivaDeUsuariosComponent;
  let fixture: ComponentFixture<CargaMasivaDeUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaMasivaDeUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaMasivaDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
