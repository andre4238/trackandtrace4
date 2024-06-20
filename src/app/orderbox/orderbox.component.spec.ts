import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderboxComponent } from './orderbox.component';

describe('OrderboxComponent', () => {
  let component: OrderboxComponent;
  let fixture: ComponentFixture<OrderboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
