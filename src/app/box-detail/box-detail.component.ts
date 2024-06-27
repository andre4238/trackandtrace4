import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AsanaNewProjectService } from '../asanaorders.service';
import { FedextrackingService } from '../fedextracking.service';
import { TrackingService } from '../tracking.service';

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
  fedexStatus: string = '';
  spedition: string = '';
  trackingNumber: string = '';

  constructor(
    private asanaService: AsanaNewProjectService,
    private fedextrackingService: FedextrackingService,
    private trackingService: TrackingService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.isOpen = true;
    }, 0);

    this.loadTaskDetails();
  }

  loadTaskDetails() {
    if (this.task && this.task.gid) {
      this.fedextrackingService.getTaskDetails(this.task.gid).subscribe(task => {
        const customFields = task.custom_fields;

        const speditionField = customFields.find((field: any) => field.name === 'Spedition');
        const trackingNumberField = customFields.find((field: any) => field.name === 'Trackingnummer');

        if (speditionField) {
          this.spedition = speditionField.text_value || speditionField.number_value || speditionField.enum_value?.name || '';
        }

        if (trackingNumberField) {
          this.trackingNumber = trackingNumberField.text_value || trackingNumberField.number_value || trackingNumberField.enum_value?.name || '';
        }

        if (this.spedition) {
          console.log(`Spedition: ${this.spedition}, Trackingnummer: ${this.trackingNumber}`);
          this.fetchTrackingInfo(this.trackingNumber); // Tracking-Info laden
        } else {
          console.log('No relevant Spedition or Trackingnummer found for task:', task.name);
        }

        this.subtasks = this.sortSubtasks(task.subtasks || []);
      });
    }
  }

  fetchTrackingInfo(trackingNumber: string) {
    this.trackingService.getTrackingInfo(trackingNumber).subscribe(
      data => {
        this.fedexStatus = JSON.stringify(data, null, 2); // Tracking-Status speichern
      },
      error => {
        console.error('Error fetching tracking info:', error);
        this.fedexStatus = `Error: ${error.message}`;
      }
    );
  }

  sortSubtasks(subtasks: any[]): any[] {
    return subtasks.sort((a, b) => {
      const keywords = ['TNT', 'FedEx', 'UPS', 'DSV'];
      const aIndex = keywords.findIndex(keyword => a.name.toLowerCase().includes(keyword.toLowerCase()));
      const bIndex = keywords.findIndex(keyword => b.name.toLowerCase().includes(keyword.toLowerCase()));

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
    if (/TNT/i.test(subtaskName)) {
      return 'tnt';
    } else if (/FedEx/i.test(subtaskName)) {
      return 'fedex';
    } else if (/UPS/i.test(subtaskName)) {
      return 'ups';
    } else if (/DSV/i.test(subtaskName)) {
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
