import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteFormComponent } from './comprobante-form.component';

describe('ComprobanteFormComponent', () => {
  let component: ComprobanteFormComponent;
  let fixture: ComponentFixture<ComprobanteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
