import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelMode } from 'devextreme/common';
import { NumberBoxType } from 'devextreme/ui/number_box';

@Component({
  selector: 'fs-number-box',
  templateUrl: './fs-number-box.component.html',
  styleUrls: ['./fs-number-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsNumberBoxComponent),
      multi: true,
    },
  ],
})
export class FsNumberBoxComponent implements ControlValueAccessor , OnInit {
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  @Input() disabled: boolean = false;
  _value: string = '';
  set value(val: string) {
    if (this.onChangeFn) {
      this.onChangeFn(val);
    }

    if (this.onTochFn) {
      this.onTochFn();
    }
    this._value = val;
    this.cdr.detectChanges();
  }
  get value() {
    return this._value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  onTochFn: Function | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChangeFn: Function | undefined;

  writeValue(val: string): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
    this.cdr.detectChanges();
  }
  registerOnTouched(fn: any): void {
    this.onTochFn = fn;
    this.cdr.detectChanges();
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  @Input() label: string = '';
  @Input() labelMode: LabelMode = 'floating';
  @Input() mode: NumberBoxType = 'number';
  @Input() isValid: boolean = true;
  @Input() validationError: any = '';
  // The maximum value accepted by the number box.
  @Input() max: number | undefined = undefined;
  // The minimum value accepted by the number box.
  @Input() min: number | undefined = undefined;
  @Input() class: string = '';
  @Input() isRequired: boolean = false;

  refreshingValidation = false;
  ngOnInit(): void {}
}
