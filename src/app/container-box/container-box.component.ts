import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
//import {AsanaService} from "../asana.service";
import {AsanacontainerServiceService} from "../asanacontainer.service";

@Component({
  selector: 'app-container-box',
  templateUrl: './container-box.component.html',
  styleUrl: './container-box.component.css'
})
export class ContainerBoxComponent {
  @ViewChild('detailContainer', { read: ViewContainerRef }) detailContainer!: ViewContainerRef;

  tasks: any[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    //private asanaService: AsanaService,
    private asanaContainerService: AsanacontainerServiceService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.asanaContainerService.getAllTasksFromProject().subscribe(
        (data: any[]) => {
        this.tasks = data;
      },
        (error: any) => {
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
        return 'badge bg-secondary'; // Blau für Status 1
      case 2:
        return 'badge bg-primary'; // Grau für Status 2
      case 3:
        return 'badge bg-warning'; // Grün für Status 3
      case 4:
        return 'badge bg-success'; // Rot für Status 4
      case 5:
        return 'badge bg-success'; // Gelb für Status 5
      default:
        return 'badge bg-dark'; // Dunkel für alle anderen Status
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'will be ordered now'; // Text für Status 1
      case 2:
        return 'ordered'; // Text für Status 2
      case 3:
        return 'in booking (nearly ready produced)'; // Text für Status 3
      case 4:
        return 'in delivery'; // Text für Status 4
      case 5:
        return 'incomming goods booking'; // Text für Status 5
      default:
        return 'documents to internal Sales'; // Text für alle anderen Status
    }
  }

}
