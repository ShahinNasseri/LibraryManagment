import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AuthService, SettingsService, User } from '@core';
import { PageHeaderComponent } from '@shared';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent,AdminDashboardComponent,UserDashboardComponent],
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

  isAdmin: boolean = false;
  constructor() {}

  ngOnInit() {
    this.authService.user().subscribe((user: User) => {
      console.log('dashboard',user);
      this.isAdmin = user.isAdmin ?? false;
      this.cdr.detectChanges();
    });
  }
}
