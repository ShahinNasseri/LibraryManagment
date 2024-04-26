import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'hp-contextmenu',
  templateUrl: './hp-contextmenu.component.html',
  styleUrls: ['./hp-contextmenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HpContextmenuComponent {
  
  @Input() items: MenuItem[] =[];
  @Input() global: boolean =false;
  @Input() target!: any;
  @Input() appendTo: string = 'body';

  ngOnInit() {
  }
}
