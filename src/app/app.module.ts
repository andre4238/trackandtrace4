import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { BoxComponent } from './box/box.component';
import { FooterComponent } from './footer/footer.component';
import { BoxDetailComponent } from './box-detail/box-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderboxComponent } from './orderbox/orderbox.component';
import { LoginheaderComponent } from './loginheader/loginheader.component';
import { ContainerBoxComponent } from './container-box/container-box.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from '../services/safe.pipe'; // Importieren Sie die Safe-Pipe



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    BoxComponent,
    FooterComponent,
    BoxDetailComponent,
    OrderboxComponent,
    LoginheaderComponent,
    ContainerBoxComponent,
    DownloadsComponent,
    SidebarComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
