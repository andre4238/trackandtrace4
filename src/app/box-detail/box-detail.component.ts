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
        this.subtasks = this.sortSubtasks(subtasks);
      });
    }
  }

  sortSubtasks(subtasks: any[]): any[] {
    return subtasks.sort((a, b) => {
      const keywords = ['TNT', 'FedEx', 'UPS', 'DSV'];
      const aIndex = keywords.findIndex(keyword => a.name.includes(keyword));
      const bIndex = keywords.findIndex(keyword => b.name.includes(keyword));

      if (aIndex === -1 && bIndex === -1) {
        return 0; // Both a and b do not contain any keywords
      } else if (aIndex === -1) {
        return 1; // a does not contain any keyword but b does
      } else if (bIndex === -1) {
        return -1; // b does not contain any keyword but a does
      } else {
        return aIndex - bIndex; // Both contain keywords, sort based on the order of keywords
      }
    });
  }

  getSubtaskClass(subtaskName: string): string {
    if (subtaskName.includes('TNT')) {
      return 'tnt';
    } else if (subtaskName.includes('FedEx')) {
      return 'fedex';
    } else if (subtaskName.includes('UPS')) {
      return 'ups';
    } else if (subtaskName.includes('DSV')) {
      return 'dsv';
    } else {
      return '';
    }
  }

  close() {
    this.isOpen = false;
    setTimeout(() => {
      this.closeDetail.emit();
    }, 300); // Zeitgleich mit der CSS-Transition
  }
}
