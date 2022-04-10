import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTotalizadorComponent } from './reporte-totalizador.component';

describe('ReporteTotalizadorComponent', () => {
  let component: ReporteTotalizadorComponent;
  let fixture: ComponentFixture<ReporteTotalizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTotalizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTotalizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
