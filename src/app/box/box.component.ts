import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { BoxDetailComponent } from '../box-detail/box-detail.component';
import { AsanaService } from '../asana.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @ViewChild('detailContainer', { read: ViewContainerRef }) detailContainer!: ViewContainerRef;

  tasks: any[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private asanaService: AsanaService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.asanaService.getAllTasksFromProject().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  /*openDetail(taskId: string) {
    console.log('openDetail called for task', taskId);
    this.detailContainer.clear(); // Clear any existing components
    const factory = this.componentFactoryResolver.resolveComponentFactory(BoxDetailComponent);
    const componentRef = this.detailContainer.createComponent(factory);

    componentRef.instance.isOpen = true;
    componentRef.instance.taskId = taskId;
    componentRef.instance.closeDetail.subscribe(() => {
      console.log('closeDetail event received');
      componentRef.instance.isOpen = false;
      setTimeout(() => {
        componentRef.destroy(); // Destroy the component on close
      }, 500); // Wait for the animation to complete
    });
  }*/

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'badge bg-primary'; // Blau für Status 1
      case 2:
        return 'badge bg-dark'; // Grau für Status 2
      case 3:
        return 'badge bg-danger'; // Grün für Status 3
      case 4:
        return 'badge bg-dark'; // Rot für Status 4
      case 5:
        return 'badge bg-success'; // Gelb für Status 5
      default:
        return 'badge bg-dark'; // Dunkel für alle anderen Status
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Goods received'; // Text für Status 1
      case 2:
        return 'In Progress'; // Text für Status 2
      case 3:
        return 'Sparepart not in stock'; // Text für Status 3
      case 4:
        return 'ready to ship'; // Text für Status 4
      case 5:
        return 'completed'; // Text für Status 5
      default:
        return 'Unknown'; // Text für alle anderen Status
    }
  }
}
