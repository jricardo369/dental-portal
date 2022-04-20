import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPacienteComponent } from './dialogo-paciente.component';

describe('DialogoPacienteComponent', () => {
  let component: DialogoPacienteComponent;
  let fixture: ComponentFixture<DialogoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
