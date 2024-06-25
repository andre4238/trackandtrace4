import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AsanaNewProjectService } from '../asanaorders.service';

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.css']
})
export class BoxDetailComponent implements OnInit {
  @Input() task: any;
  @Output() closeDetail = new EventEmitter<void>();
  isOpen = false;
  subtasks: any[] = [];

  constructor(private asanaService: AsanaNewProjectService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isOpen = true;
    }, 0);

    this.loadSubtasks();
  }

  loadSubtasks() {
    if (this.task && this.task.gid) {
      this.asanaService.getSubtasks(this.task.gid).subscribe(subtasks => {
        this.subtasks = subtasks;
      });
    }
  }

  close() {
    this.isOpen = false;
    setTimeout(() => {
      this.closeDetail.emit();
    }, 300); // Zeitgleich mit der CSS-Transition
  }
}
