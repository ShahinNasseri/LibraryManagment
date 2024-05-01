import {
  Component,
  ChangeDetectorRef,
  Input,
  ViewChild,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { DxSelectBoxComponent } from 'devextreme-angular';
import { LabelMode } from 'devextreme/common';

@Component({
  selector: 'fs-selectbox',
  templateUrl: './fs-selectbox.component.html',
  styleUrls: ['./fs-selectbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FSSelectboxComponent),
      multi: true,
    },
  ],
})
export class FSSelectboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @ViewChild('element', { static: true }) element!: DxSelectBoxComponent;
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
  constructor() {}

  ngOnInit() {}

  @Input() formGroup: FormGroup | undefined;
  @Input() formNames: any;
  @Input() class: string = '';
  @Input() label: string = '';
  @Input() labelMode: LabelMode = 'floating';
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = false;

  // Specifies the text displayed by the select box item.
  @Input() displayExpr: string = '';
  // Specifies the value of each select box items.
  @Input() showClearButton: boolean = false;
  @Input() valueExpr: string = '';
  @Input() placeholder: string = '';
  @Input() noDataText: string = 'داده ای یافت نشد!';
  @Input() hideOnParentScroll: boolean = false;
  @Input() isValid: boolean = true;
  @Input() validationError: any = '';
  // A data source used to fetch data the widget should display.
  // A function that is executed after the widget's  is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onValueChanged = new EventEmitter<any>();
  @Input() isRequired: boolean = false;

  dataSourceValue: any = null;
  @Input() dataSource: any;
  // @Input() get dataSource() {
  //   return this.dataSourceValue;
  // }

  // set dataSource(value: any) {
  //   this.dataSourceValue = value;
  //   this.cdr.detectChanges();
  // }

  onValueChangedExtra(e: any): void {
    this.onValueChanged.emit(e);

    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.element != null) {
      this.element.instance.dispose();
    }
  }
}
