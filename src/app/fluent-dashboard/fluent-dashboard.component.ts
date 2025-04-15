import { Component } from '@angular/core';

@Component({
  selector: 'app-fluent-dashboard',
  templateUrl: './fluent-dashboard.component.html',
  styleUrl: './fluent-dashboard.component.css'
})
export class FluentDashboardComponent {

  activeButton: string = 'dashboard';

  setActive(button: string) {
    this.activeButton = button;
  }

}
