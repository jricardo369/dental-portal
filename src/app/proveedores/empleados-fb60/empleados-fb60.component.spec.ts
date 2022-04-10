import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosFb60Component } from './empleados-fb60.component';

describe('EmpleadosFb60Component', () => {
  let component: EmpleadosFb60Component;
  let fixture: ComponentFixture<EmpleadosFb60Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosFb60Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosFb60Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
