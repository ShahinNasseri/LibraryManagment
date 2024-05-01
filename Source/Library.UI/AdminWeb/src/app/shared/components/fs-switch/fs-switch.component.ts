import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DxSwitchComponent } from 'devextreme-angular';
import { ValidationMessageMode } from 'devextreme/common';

@Component({
  selector: 'fs-switch',
  templateUrl: './fs-switch.component.html',
  styleUrls: ['./fs-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsSwitchComponent),
      multi: true,
    },
  ],
})
export class FsSwitchComponent implements ControlValueAccessor , AfterViewInit , OnInit , OnDestroy{
  @ViewChild('switchInstance', { static: true })
  switchInstance!: DxSwitchComponent;

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onAfterViewInit.emit(this);
  }

  ngOnDestroy(): void {}
  _value: string = '';
  @Input() set value(val: string) {
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

  // Specifies the shortcut key that sets focus on the widget.
  @Input() accessKey: string = '';
  // Specifies whether or not the widget changes its state when interacting with a user.
  @Input() activeStateEnabled: boolean = true;
  // Specifies whether the widget responds to user interaction.
  @Input() disabled: boolean = false;
  // Specifies the  to be attached to the widget's root element.
  @Input() elementAttr: object = {};
  // Specifies whether the widget can be focused using keyboard navigation.
  @Input() focusStateEnabled: boolean = true;
  // Specifies the widget's height.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height: number | string | Function | undefined;
  // Specifies text for a hint that appears when a user pauses on the widget.
  @Input() hint: string = '';
  // Specifies whether the widget changes its state when a user pauses on it.
  @Input() hoverStateEnabled: boolean = true;
  // Specifies whether the editor's value is valid.
  @Input() isValid: boolean = true;
  // The value to be assigned to the <code>name</code> attribute of the underlying HTML element.
  @Input() name: string = '';
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = true;
  // Specifies the text displayed when the widget is switched off.
  @Input() switchedOffText: string = 'Yes';
  // Specifies the text displayed when the widget is switched on.
  @Input() switchedOnText: string = 'No';
  // Specifies the number of the element when the Tab key is used for navigating.
  @Input() tabIndex: number = 0;
  // Specifies information on the validation error when using a custom validation engine. Should be changed at runtime along with the  option.
  @Input() validationError: object | undefined;
  // Specifies how the message about the  that are not satisfied by this editor's value is displayed.
  @Input() validationMessageMode: ValidationMessageMode = 'auto';
  // A Boolean value specifying whether the current switch state is "On" or "Off".
  // Specifies whether the widget is visible.
  @Input() visible: boolean = true;
  // Specifies the widget's width.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() width: number | string | Function = '70px';
  // A Boolean value specifying whether or not the widget is read-only.
  @Input() readOnly: boolean = false;

  // A function that is executed when the widget's content is ready and each time the content is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onContentReady = new EventEmitter<any>();
  // A function that is executed before the widget is .
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing = new EventEmitter<any>();
  // A function that is executed only once, after the widget is initialized.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInitialized = new EventEmitter<any>();
  // A function that is executed after a widget option is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOptionChanged = new EventEmitter<any>();
  // A function that is executed after the widget's  is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onValueChanged = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAfterViewInit = new EventEmitter<any>();
}
