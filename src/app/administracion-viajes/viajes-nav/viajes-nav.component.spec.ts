import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesNavComponent } from './viajes-nav.component';

describe('ViajesNavComponent', () => {
  let component: ViajesNavComponent;
  let fixture: ComponentFixture<ViajesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
