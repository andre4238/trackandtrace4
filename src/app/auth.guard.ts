import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map(user => {
        console.log('AuthGuard: User state', user);
        return !!user;
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('AuthGuard: User not logged in, redirecting to /login');
          this.router.navigate(['/login']);
        } else {
          console.log('AuthGuard: User logged in, access granted');
        }
      })
    );
  }
}
