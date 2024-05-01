import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelMode, MaskMode, ValidationMessageMode, ValidationStatus } from 'devextreme/common';
import { TextBoxType } from 'devextreme/ui/text_box';

@Component({
  selector: 'fs-text-box',
  templateUrl: './fs-text-box.component.html',
  styleUrls: ['./fs-text-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsTextBoxComponent),
      multi: true,
    },
  ],
})
export class FsTextBoxComponent implements ControlValueAccessor, OnInit {
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  @Input() disabled: boolean = false;
  _value: string = '';
  @Input() set value(val: string) {
    if (val == this._value) {
      return;
    }
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
    // this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onContentReady = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCopy = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCut = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEnterKey = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFocusIn = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFocusOut = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInitialized = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInput = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onKeyDown = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onKeyPress = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onKeyUp = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOptionChanged = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPaste = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onValueChanged = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onBlur = new EventEmitter<any>();

  @Input() label: string = '';
  @Input() labelMode: LabelMode = 'floating';
  @Input() mode: TextBoxType = 'text';
  @Input() isValid: boolean = true;
  @Input() validationError: any = '';
  @Input() isRequired: boolean = false;
  @Input() class: string = '';
  @Input() hasButton: boolean = false;
  @Input() button: any;
  @Input() isNumeric: boolean = false;

  @Input() accessKey: string = '';
  @Input() activeStateEnabled: boolean = false;
  @Input() elementAttr: object = {};
  @Input() focusStateEnabled: boolean = true;
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height: number | string | Function | undefined = undefined;
  @Input() hint: string | undefined = undefined;
  @Input() hoverStateEnabled: boolean = true;
  @Input() inputAttr: object = {};
  @Input() mask: string = '';
  @Input() inputNgStyle: any;
  @Input() maskChar: string = '';
  @Input() maskInvalidMessage: string = 'مقدار نا معتبر است.';
  @Input() maskRules: any = {};
  @Input() maxLength: number | string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() rtlEnabled: boolean = true;
  @Input() showClearButton: boolean = true;
  @Input() showMaskMode: MaskMode = 'always';
  @Input() spellcheck: boolean = false;
  @Input() tabIndex: number = 0;
  @Input() text: string = ''; 
  @Input() useMaskedValue: boolean = false;
  @Input() visible: boolean = true;
  @Input() valueChangeEvent: string = 'keyup';
  @Input() validationMessageMode: ValidationMessageMode = 'auto';
  @Input() validationStatus: ValidationStatus = 'valid';

  refreshingValidation = false;
  ngOnInit(): void {}

  onBlurExtra(e: any) {
    if (this.onTochFn) {
      this.onTochFn();
    }

    this.onBlur.emit(e);
  }

  public restrictNumeric(e: any) {
    if (this.isNumeric) {
      let input;
      if (e.metaKey || e.ctrlKey) {
        return true;
      }
      if (e.which === 32) {
        return false;
      }
      if (e.which === 0) {
        return true;
      }
      if (e.which < 33) {
        return true;
      }
      // eslint-disable-next-line prefer-const
      input = String.fromCharCode(e.which);
      return !!/[\d\s]/.test(input);
    } else return true;
  }
}
