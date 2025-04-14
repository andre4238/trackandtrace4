import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fluent-dashboard',
  templateUrl: './fluent-dashboard.component.html',
  styleUrl: './fluent-dashboard.component.css'
})
export class FluentDashboardComponent {
  constructor(public auth: AngularFireAuth, private router: Router) {}
}
