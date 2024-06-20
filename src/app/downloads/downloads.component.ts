import { Component } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  files = [
    { name: 'ADAS Manual', url: '/assets/1.png' },
    { name: 'Activate Software on Euro Link', url: '/assets/files/datei2.pdf' },
    { name: 'Register Device', url: '/assets/files/datei3.pdf' },
  ];

  downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = <string>url.split('/').pop();
    link.click();
  }
}
