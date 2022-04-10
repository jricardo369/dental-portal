import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GastoSolicitudCajaChicaFormComponent } from './gasto-solicitud-caja-chica-form.component';



describe('GastoSolicitudCajaChicaFormComponent', () => {
  let component: GastoSolicitudCajaChicaFormComponent;
  let fixture: ComponentFixture<GastoSolicitudCajaChicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoSolicitudCajaChicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoSolicitudCajaChicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
