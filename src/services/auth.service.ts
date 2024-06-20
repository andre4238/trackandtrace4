import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout() {
    // Entferne den Authentifizierungstoken aus dem lokalen Speicher
    localStorage.removeItem('authToken');

    // Weitere Logout-Operationen, falls notwendig

    // Navigiere zur Login-Seite
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
