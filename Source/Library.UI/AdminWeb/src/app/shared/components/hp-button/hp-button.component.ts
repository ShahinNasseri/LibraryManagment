import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'hp-button',
  templateUrl: './hp-button.component.html',
  styleUrls: ['./hp-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HpButtonComponent implements OnInit {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() outlined: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() size: string = ''; //sm | lg  ;
  @Input() raised: boolean = true; //give shadow to button
  @Input() btnType?: string; //secondary | success | info | help | danger
  @Input() type?: string; //secondary | success | info | help | danger
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initialPublicVariables();
  }

  private initialPublicVariables() {
    switch (this.btnType) {
      case 'secondary':
        this.className += ' ' + 'p-button-secondary';
        break;
      case 'success':
        this.className += ' ' + 'p-button-success';
        break;
      case 'info':
        this.className += ' ' + 'p-button-info';
        break;
      case 'warning':
        this.className += ' ' + 'p-button-warning';
        break;
      case 'help':
        this.className += ' ' + 'p-button-help';
        break;

      case 'danger':
        this.className += ' ' + 'p-button-danger';
        break;
      default:
        break;
    }

    if (this.outlined) {
      this.className += ' ' + 'p-button-outlined';
    }

    if (this.raised) {
      this.className += ' ' + 'p-button-raised';
    }

    if (this.size == 'sm') {
      this.className += ' ' + 'p-button-sm';
    } else if (this.size == 'lg') {
      this.className += ' ' + 'p-button-lg';
    }
  }
}
