import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'fs-button',
  templateUrl: './fs-button.Component.html',
  styleUrls: ['./fs-button.Component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsButtonComponent {
  @Input() icon: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() type: 'normal' | 'success' | 'default' | 'danger' = 'default';
  @Input() stylingMode: 'contained' | 'text' | 'outlined' = 'contained';
  @Input() useSubmitBehavior: boolean = true;
  @Input() disabled: boolean = false;
  @Input() height: number = 30;
  @Input() hasLoading: boolean = false;

  @Output() clicked = new EventEmitter<any>();
}
