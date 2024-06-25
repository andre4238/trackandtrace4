import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMAIL_FILTERS } from '../services/filter.config';

@Injectable({
  providedIn: 'root'
})
export class AsanaNewProjectService {
  private apiUrl = 'https://app.asana.com/api/1.0';
  private token = '2/1203313256836062/1207532839527098:02416af9d4fe28c8869a4a736ecd44a8';
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  getTasksFromSection(sectionId: string, status: number, filters: string[]): Observable<any[]> {
    const url = sectionId === '1199881286180031' ?
      `${this.apiUrl}/sections/${sectionId}/tasks?limit=10` :
      `${this.apiUrl}/sections/${sectionId}/tasks`;

    console.log('Request URL:', url);
    console.log('Headers:', this.headers);

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => {
        let tasks = response.data
          .filter((task: any) => filters.some(filter => task.name.includes(filter)))
          .map((task: any) => ({
            ...task,
            status
          }));

        // Sortiere die Tasks nach dem Erstellungsdatum, absteigend
        tasks = tasks.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        // Begrenze die Anzahl der Tasks für die spezielle Sektion
        if (sectionId === '1199881286180031') {
          tasks = tasks.slice(0, 100);
        }

        return tasks;
      }),
      catchError(error => {
        console.error(`Error fetching tasks from section with ID: ${sectionId}`, error);
        return of([]);
      })
    );
  }

  getSubtasks(taskId: string): Observable<any[]> {
    const url = `${this.apiUrl}/tasks/${taskId}/subtasks`;
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error fetching subtasks for task with ID: ${taskId}`, error);
        return of([]);
      })
    );
  }

  getAllTasksFromNewProject(): Observable<any[]> {
    const sections = [
      { id: '1199881286180010', status: 1 },
      { id: '1199881286180029', status: 2 },
      { id: '1199881286180030', status: 3 },
      { id: '1199881286180136', status: 4 },
      { id: '1199881286180031', status: 5 },
      //{ id: '1199881286180031', status: 6 }
    ];

    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user && user.email) {
          const filters = EMAIL_FILTERS[user.email] || [];
          const sectionTasks$ = sections.map(section =>
            this.getTasksFromSection(section.id, section.status, filters)
          );
          return forkJoin(sectionTasks$).pipe(
            map(sectionsTasks => sectionsTasks.flat()),
            catchError(error => {
              console.error(`Error fetching tasks from new project`, error);
              return of([]);
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }
}
