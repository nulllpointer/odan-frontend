import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderprocessComponent } from './orderprocess.component';

describe('OrderprocessComponent', () => {
  let component: OrderprocessComponent;
  let fixture: ComponentFixture<OrderprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
