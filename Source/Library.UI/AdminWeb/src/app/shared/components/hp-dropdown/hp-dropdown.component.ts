import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hp-dropdown',
  templateUrl: './hp-dropdown.component.html',
  styleUrls: ['./hp-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HpDropdownComponent),
    },
  ],
  //*============================
})
export class HpDropdownComponent implements OnInit {
  @Input() options: any[] = [];

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  public ngModelValue: any;
  @Input()
  get ngModel(): any {
    return this.ngModelValue;
  }
  set ngModel(v: any) {
    this.ngModelValue = v;
    this.ngModelChange.emit(v);
  }

  @Input() name: string = '';
  @Input() optionValue: string = 'id';
  @Input() optionLabel: string = '';
  @Input() className: string = '';

  @Output() onFilter =new EventEmitter();
  @Output() onChange:EventEmitter<any> =new EventEmitter();

  //reactive form dependencies
  onChanged: any = () => { };
  onTouched: any = () => { };

  @Input() disabled: boolean = false;
  writeValue(val: any) {
    this.ngModel = val;
  }
  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  constructor() { }

  ngOnInit(): void { }
}
