import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FsToolbarModule } from '@shared/components/fs-toolbar/fs-toolbar.module';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FsToolbarModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent  {


}
