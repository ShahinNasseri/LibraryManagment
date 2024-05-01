import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LabelMode } from 'devextreme/common';

@Component({
  selector: 'fs-text-area',
  templateUrl: './fs-text-area.component.html',
  styleUrls: ['./fs-text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsTextAreaComponent),
      multi: true,
    },
  ],
})
export class FsTextAreaComponent implements ControlValueAccessor, OnInit {
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
  @Input() mode: string = '';
  @Input() dataField: string = '';
  @Input() isValid: boolean = true;
  @Input() validationError: any;
  @Input() maxLength: any;
  @Input() height: any = 90;
  @Input() autoResizeEnabled: boolean = true;

  @Input() class: string = '';
  ngOnInit(): void {}
}
