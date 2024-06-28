import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.css']
})
export class ServiceModalComponent {
  @Input() task: any;
  @Input() trackingNumber: string = '';

  @Input() fedexStatus: any;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
