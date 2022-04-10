import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesGastoComponent } from './clases-gasto.component';

describe('ClasesGastoComponent', () => {
  let component: ClasesGastoComponent;
  let fixture: ComponentFixture<ClasesGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
