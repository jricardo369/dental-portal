import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasProgramadasComponent } from './tareas-programadas.component';

describe('TareasProgramadasComponent', () => {
  let component: TareasProgramadasComponent;
  let fixture: ComponentFixture<TareasProgramadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasProgramadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasProgramadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
