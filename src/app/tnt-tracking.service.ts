import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TntTrackingService {
  private apiUrl = 'https://express.tnt.com/expressconnect/track.do';
  private username = 'andre4238';
  private password = 'Jihlava5867-';

  constructor(private http: HttpClient) { }

  getTrackingStatus(trackingNumber: string): Observable<any> {
    console.log('Tracking number sent to API:', trackingNumber);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    });

    const body = {
      TrackRequest: {
        locale: 'en_US',
        version: '3.1',
        searchCriteria: {
          consignmentNumber: [trackingNumber]
        },
        levelOfDetail: {
          complete: {},
          pod: {
            format: 'URL'
          }
        }
      }
    };

    console.log('Request body:', JSON.stringify(body, null, 2));

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  extractTrackingNumber(subtaskName: string): string | null {
    const match = subtaskName.match(/TNT\s+(\d+)/);
    console.log('Extracted tracking number:', match ? match[1] : 'No match found');
    return match ? match[1] : null;
  }
}
