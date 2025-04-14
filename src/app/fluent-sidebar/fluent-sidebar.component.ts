import { Component } from '@angular/core';

@Component({
  selector: 'app-fluent-sidebar',
  templateUrl: './fluent-sidebar.component.html',
  styleUrl: './fluent-sidebar.component.css'
})
export class FluentSidebarComponent {
  activeButton: string = 'dashboard'; // Standard aktiv

  setActive(name: string) {
    this.activeButton = name;
  }


}
