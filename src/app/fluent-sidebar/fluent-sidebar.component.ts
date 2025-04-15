import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-fluent-sidebar',
  templateUrl: './fluent-sidebar.component.html',
  styleUrl: './fluent-sidebar.component.css'
})
export class FluentSidebarComponent {
  activeButton: string = 'dashboard'; // Standard aktiv



  @Output() activeChange = new EventEmitter<string>();

  setActive(button: string) {
    this.activeButton = button;
    this.activeChange.emit(button);
  }
}
