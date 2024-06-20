import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(public auth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      console.log('LoginComponent: authState changed:', user);
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        console.log('LoginComponent: User is logged in, navigating to /dashboard');
        this.router.navigate(['/dashboard']);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  loginWithEmail() {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.email && this.password) {
      this.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
        .then((userCredential) => {
          console.log('LoginComponent: Login successful:', userCredential.user);
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error('LoginComponent: Login error:', error);
          this.errorMessage = error.message;
        });
    }
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        console.log('LoginComponent: Logout successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('LoginComponent: Logout error:', error);
      });
  }
}
