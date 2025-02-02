import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesKanbanComponent } from './sales-kanban.component';

describe('SalesKanbanComponent', () => {
  let component: SalesKanbanComponent;
  let fixture: ComponentFixture<SalesKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
