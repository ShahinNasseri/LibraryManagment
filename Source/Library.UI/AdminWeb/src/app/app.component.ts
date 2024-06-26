import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet],
  providers:[
    ConfirmationService
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);

  ngOnInit() {
    this.settings.reset();
    this.settings.setDirection();
    this.settings.setTheme();
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
