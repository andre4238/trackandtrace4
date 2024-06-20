import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'your-app-name';

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      console.log('AppComponent: Auth state changed:', user);
    });
  }
}
