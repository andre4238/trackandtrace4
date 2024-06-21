import { Component, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  @ViewChild('viewFileModal') viewFileModal!: TemplateRef<any>;

  files = [
    { name: 'Datei 1', url: '/assets/zertifikat IHK.pdf' },
    { name: 'Datei 2', url: '/assets/files/datei2.pdf' },
    { name: 'Datei 3', url: '/assets/files/datei3.pdf' },
  ];

  fileContent: SafeResourceUrl = '';

  constructor(private http: HttpClient, private modalService: NgbModal, private sanitizer: DomSanitizer) {}

  downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || '';
    link.click();
  }

  viewFile(url: string): void {
    this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.modalService.open(this.viewFileModal);
  }
}
