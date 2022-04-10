import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaChicaNavComponent } from './caja-chica-nav.component';

describe('CajaChicaNavComponent', () => {
  let component: CajaChicaNavComponent;
  let fixture: ComponentFixture<CajaChicaNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaChicaNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaChicaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
