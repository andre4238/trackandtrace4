import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.css']
})
export class BoxDetailComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() task: any; // Akzeptiert das Task-Objekt als Eingabe
  @Output() closeDetail = new EventEmitter<void>();
  taskId: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      const detailElement = document.querySelector('.box-detail');
      if (this.isOpen) {
        detailElement?.classList.add('show');
        detailElement?.classList.remove('hide');
      } else {
        detailElement?.classList.add('hide');
        detailElement?.classList.remove('show');
      }
    }
  }

  close(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = false;
    setTimeout(() => {
      this.closeDetail.emit();
    }, 500); // Warte, bis die Animation abgeschlossen ist
  }
}
