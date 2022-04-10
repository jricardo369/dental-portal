import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresNavComponent } from './proveedores-nav.component';

describe('ProveedoresNavComponent', () => {
  let component: ProveedoresNavComponent;
  let fixture: ComponentFixture<ProveedoresNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
