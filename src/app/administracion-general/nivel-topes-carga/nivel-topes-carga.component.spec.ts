import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelTopesCargaComponent } from './nivel-topes-carga.component';

describe('NivelTopesCargaComponent', () => {
  let component: NivelTopesCargaComponent;
  let fixture: ComponentFixture<NivelTopesCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelTopesCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelTopesCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
