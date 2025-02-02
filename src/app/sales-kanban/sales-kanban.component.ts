import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-kanban',
  templateUrl: './sales-kanban.component.html',
  styleUrls: ['./sales-kanban.component.css']
})
export class SalesKanbanComponent {
  stages = ['Lead', 'Kontakt', 'Verhandlung', 'Abschluss'];
  deals = [
    { id: 1, name: 'Kunde A', stage: 'Lead' },
    { id: 2, name: 'Kunde B', stage: 'Kontakt' },
    { id: 3, name: 'Kunde C', stage: 'Verhandlung' },
    { id: 4, name: 'Kunde D', stage: 'Abschluss' }
  ];

  onDrop(event: DragEvent, stage: string) {
    event.preventDefault();
    const dealId = event.dataTransfer?.getData('text');
    const deal = this.deals.find(d => d.id.toString() === dealId);
    if (deal) deal.stage = stage;
  }

  onDragStart(event: DragEvent, dealId: number) {
    event.dataTransfer?.setData('text', dealId.toString());
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
