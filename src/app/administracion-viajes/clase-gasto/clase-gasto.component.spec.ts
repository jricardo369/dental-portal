import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseGastoComponent } from './clase-gasto.component';

describe('ClaseGastoComponent', () => {
  let component: ClaseGastoComponent;
  let fixture: ComponentFixture<ClaseGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaseGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
