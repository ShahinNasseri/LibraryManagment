import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'hp-loading',
  templateUrl: './hp-loading.component.html',
  styleUrls: ['./hp-loading.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HpLoadingComponent  {
  @Input() loadingState:boolean = false;
}
