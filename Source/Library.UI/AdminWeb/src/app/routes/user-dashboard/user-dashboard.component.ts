import { Component } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

}
