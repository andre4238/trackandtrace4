import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FedextrackingService {
  private apiUrl = 'https://app.asana.com/api/1.0';
  private token = '2/1203313256836062/1207532839527098:02416af9d4fe28c8869a4a736ecd44a8'; // Verwenden Sie den gleichen Token wie in AsanaNewProjectService
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getTaskDetails(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => {
        const task = response.data;
        console.log('Custom Fields:', task.custom_fields);
        return task;
      }),
      catchError(error => {
        console.error(`Error fetching task details for task with ID: ${taskId}`, error);
        return of(null);
      })
    );
  }
}
