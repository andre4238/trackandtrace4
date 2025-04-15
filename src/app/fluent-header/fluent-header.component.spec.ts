import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentHeaderComponent } from './fluent-header.component';

describe('FluentHeaderComponent', () => {
  let component: FluentHeaderComponent;
  let fixture: ComponentFixture<FluentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
