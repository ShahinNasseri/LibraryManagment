import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DxCheckBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'fs-check-box',
  templateUrl: './fs-check-box.component.html',
  styleUrls: ['./fs-check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsCheckBoxComponent),
      multi: true,
    },
  ],
})
export class FsCheckBoxComponent implements ControlValueAccessor, OnInit , OnDestroy {
  @ViewChild('element', { static: true }) element!: DxCheckBoxComponent;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
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
  @Input() class: string= '';
  // Specifies the text displayed by the check box.
  @Input() text: string = '';
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = false;
  // Specifies whether the widget responds to user interaction.
  @Input() disabled: boolean = false;
  @Input() isValid: boolean = true;
  @Input() validationError: any;
  ngOnDestroy(): void {
    if (this.element != null) {
      this.element.instance.dispose();
    }
  }
}
