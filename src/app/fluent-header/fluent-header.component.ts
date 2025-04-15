import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fluent-header',
  templateUrl: './fluent-header.component.html',
  styleUrls: ['./fluent-header.component.css']
})
export class FluentHeaderComponent {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('HeaderComponent: Logout successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('HeaderComponent: Logout error:', error);
      });
  }

  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  notifications = [
    'Neues Paket eingetroffen',
    'Update zur Sendung 123456',
    'Supportanfrage beantwortet'
  ];

  clearNotifications() {
    this.notifications = [];
  }

}
