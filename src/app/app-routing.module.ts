import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { DownloadsComponent } from './downloads/downloads.component';
import { SalesKanbanComponent } from './sales-kanban/sales-kanban.component';
import {FluentDashboardComponent} from "./fluent-dashboard/fluent-dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: FluentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'downloads', component: DownloadsComponent, canActivate: [AuthGuard] },
  { path: 'salespipe', component: SalesKanbanComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' } // Fallback-Route für nicht existierende Seiten
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    useHash: false, // Setze auf true, falls du Hash-Routing willst (z. B. für ältere Browser)
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
