import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMAIL_FILTERS } from '../services/filter.config'; // Annahme: Die Datei befindet sich im gleichen Verzeichnis

@Injectable({
  providedIn: 'root'
})
export class AsanacontainerServiceService {
  private apiUrl = 'https://app.asana.com/api/1.0';
  private token = '2/1203313256836062/1207532839527098:02416af9d4fe28c8869a4a736ecd44a8';
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  getTasksFromSection(sectionId: string, status: number, filters: string[]): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/sections/${sectionId}/tasks`, { headers: this.headers }).pipe(
      map(response => {
        let tasks = response.data
          .filter((task: any) => filters.some(filter => task.name.includes(filter)))
          .map((task: any) => ({
            ...task,
            status
          }));
        tasks = tasks.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 15);
        return tasks;
      }),
      catchError(error => {
        console.error(`Error fetching tasks from section with ID: ${sectionId}`, error);
        return of([]);
      })
    );
  }

  getAllTasksFromProject(): Observable<any[]> {
    const sections = [
      { id: '1199712244806250', status: 1 },
      { id: '1199887293804530', status: 2 },
      { id: '1200257851029489', status: 3 },
      { id: '1199712244806254', status: 4 },
      { id: '1199712244806255', status: 5 }
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
              console.error(`Error fetching tasks from project`, error);
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
