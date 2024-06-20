import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { BoxDetailComponent } from '../box-detail/box-detail.component';
import { AsanaNewProjectService } from '../asanaorders.service';

@Component({
  selector: 'app-box-new-project',
  templateUrl: './orderbox.component.html',
  styleUrls: ['./orderbox.component.css']
})
export class OrderboxComponent implements OnInit {
  @ViewChild('detailContainer', { read: ViewContainerRef }) detailContainer!: ViewContainerRef;

  tasks: any[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private asanaNewProjectService: AsanaNewProjectService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.asanaNewProjectService.getAllTasksFromNewProject().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  /*openDetail(task: any) {
    console.log('openDetail called for task', task);
    this.detailContainer.clear(); // Clear any existing components
    const factory = this.componentFactoryResolver.resolveComponentFactory(BoxDetailComponent);
    const componentRef = this.detailContainer.createComponent(factory);

    componentRef.instance.isOpen = true;
    componentRef.instance.task = task; // Set the task input for the detail component
    componentRef.instance.closeDetail.subscribe(() => {
      console.log('closeDetail event received');
      componentRef.instance.isOpen = false;
      setTimeout(() => {
        componentRef.destroy(); // Destroy the component on close
      }, 500); // Wait for the animation to complete
    });
  }*/
}
