import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hp-inputswitch',
  templateUrl: './hp-inputswitch.component.html',
  styleUrls: ['./hp-inputswitch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //reactive form dependencies
  //*============================
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HpInputswitchComponent),
    },
  ],
  //*============================
})
export class HpInputswitchComponent implements OnInit, ControlValueAccessor {
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ngModel: boolean = false;
  @Input() name: string = '';

  @Output() onClick = new EventEmitter();
  @Output() onChange :EventEmitter<any> = new EventEmitter<any>();


  constructor() {}

  ngOnInit(): void {}

  //reactive form dependencies
  //*============================
  onChanged: any = (e: any) => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;
  writeValue(val: boolean) {
    this.ngModel = val;
  }
  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(val: boolean): void {
    this.disabled = val;
  }
  ngModelChangeExtra(e: boolean) {
    this.ngModelChange.emit(e);
    this.onChanged(e);
  }
  //*============================
}
