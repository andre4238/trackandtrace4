import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private baseUrl = 'http://localhost:3001'; // Aktualisieren Sie die URL entsprechend dem neuen Port

  constructor(private http: HttpClient) {}

  getTrackingInfo(trackingNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/track/${trackingNumber}`);
  }
}
