import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    console.log('DashboardComponent: initialized');
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        console.log('DashboardComponent: Logout successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('DashboardComponent: Logout error:', error);
      });
  }
}
