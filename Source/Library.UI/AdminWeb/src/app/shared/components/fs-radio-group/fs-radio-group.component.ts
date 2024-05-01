import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DxRadioGroupComponent } from 'devextreme-angular';
import { Orientation, ValidationMessageMode } from 'devextreme/common';
import { Store } from 'devextreme/data';
import DataSource, { DataSourceOptions } from 'devextreme/data/data_source';

@Component({
  selector: 'fs-radio-group',
  templateUrl: './fs-radio-group.component.html',
  styleUrls: ['./fs-radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsRadioGroupComponent),
      multi: true,
    },
  ],
})
// eslint-disable-next-line max-len
export class FsRadioGroupComponent implements OnInit , AfterViewInit , OnDestroy, ControlValueAccessor{
  @ViewChild('element', { static: true }) element!: DxRadioGroupComponent;

  constructor() { }
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

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  @Input() compclass: string = '';
  @Input() compStyle: any = null;

  // Specifies the shortcut key that sets focus on the widget.
  @Input() accessKey: string | undefined = undefined;
  // Specifies whether or not the widget changes its state when interacting with a user.
  @Input() activeStateEnabled: boolean = true;
  // A data source used to fetch data the widget should display.
  @Input() dataSource: DataSource | DataSourceOptions | Store | null | string | Array<any> = null;
  // Specifies the name of the data source item field whose value is displayed by the widget.
  @Input() displayExpr: string | undefined = undefined;
  // Specifies the  to be attached to the widget's root element.
  @Input() elementAttr: object | undefined = {};
  // Specifies whether the widget can be focused using keyboard navigation.
  @Input() focusStateEnabled: boolean = true;
  // Specifies the widget's height.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height: number | string | Function  | undefined = undefined;
  // Specifies text for a hint that appears when a user pauses on the widget.
  @Input() hint: string | undefined = undefined;
  // Specifies whether the widget changes its state when a user pauses on it.
  @Input() hoverStateEnabled: boolean = true;
  // Specifies whether the editor's value is valid.
  @Input() isValid: boolean = true;
  // An array of items displayed by the widget.
  @Input() items: any[] = [];
  // Specifies a custom template for items.
  @Input() itemTemplate: any = 'item';
  // Specifies the radio group layout.'vertical', 'horizontal'
  @Input() layout: Orientation = 'vertical';
  // The value to be assigned to the <code>name</code> attribute of the underlying HTML element.
  @Input() name: string = '';
  // A Boolean value specifying whether or not the widget is read-only.
  @Input() readOnly: boolean = false;
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = true;
  // Specifies the number of the element when the Tab key is used for navigating.
  @Input() tabIndex: number = 0;
  // Specifies information on the validation error when using a custom validation engine. Should be changed at runtime along with the  option.
  @Input() validationError: object | undefined = undefined;
  // Specifies how the message about the  that are not satisfied by this editor's value is displayed.
  @Input() validationMessageMode: ValidationMessageMode = 'auto';
  // Specifies which data field provides the widget's . When this option is not set, the <strong>value</strong> is the entire data object.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() valueExpr: string | Function = 'this';
  // Specifies whether the widget is visible.
  @Input() visible: boolean = true;
  // Specifies the widget's width.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() width: number | string | Function | undefined = undefined;


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


  // A model for input dataSource api
  @Input() isRequired: boolean = false;
  @Input() isRequiredMessage: string = `The field is required`;

  ngOnDestroy(): void {
      this.element.instance.dispose();
  }

}
