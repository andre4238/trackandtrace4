import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentDashboardComponent } from './fluent-dashboard.component';

describe('FluentDashboardComponent', () => {
  let component: FluentDashboardComponent;
  let fixture: ComponentFixture<FluentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
