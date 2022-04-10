import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TusCredencialesComponent } from './tus-credenciales.component';

describe('TusCredencialesComponent', () => {
  let component: TusCredencialesComponent;
  let fixture: ComponentFixture<TusCredencialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusCredencialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TusCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
