import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelesTopesCargaComponent } from './niveles-topes-carga.component';

describe('NivelesTopesCargaComponent', () => {
  let component: NivelesTopesCargaComponent;
  let fixture: ComponentFixture<NivelesTopesCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelesTopesCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelesTopesCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
