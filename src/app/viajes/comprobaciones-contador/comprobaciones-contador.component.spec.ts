import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobacionesContadorComponent } from './comprobaciones-contador.component';

describe('ComprobacionesContadorComponent', () => {
  let component: ComprobacionesContadorComponent;
  let fixture: ComponentFixture<ComprobacionesContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobacionesContadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobacionesContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
