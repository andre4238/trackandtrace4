import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importiere AngularFireAuth
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Korrigiere `styleUrl` zu `styleUrls`
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private afAuth: AngularFireAuth // Injektion von AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

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
}
