import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDeCreditoComponent } from './nota-de-credito.component';

describe('NotaDeCreditoComponent', () => {
  let component: NotaDeCreditoComponent;
  let fixture: ComponentFixture<NotaDeCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaDeCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaDeCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
