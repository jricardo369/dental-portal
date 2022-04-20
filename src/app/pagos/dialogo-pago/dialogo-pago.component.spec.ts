import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPagoComponent } from './dialogo-pago.component';

describe('DialogoPagoComponent', () => {
  let component: DialogoPagoComponent;
  let fixture: ComponentFixture<DialogoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
