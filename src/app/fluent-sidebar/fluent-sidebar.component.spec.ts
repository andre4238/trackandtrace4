import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentSidebarComponent } from './fluent-sidebar.component';

describe('FluentSidebarComponent', () => {
  let component: FluentSidebarComponent;
  let fixture: ComponentFixture<FluentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
