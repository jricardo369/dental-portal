import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FletesComponent } from './fletes.component';

describe('FletesComponent', () => {
  let component: FletesComponent;
  let fixture: ComponentFixture<FletesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FletesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
