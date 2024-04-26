import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpService } from '@core/ai/http.service';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { EditorStyle, SimplifiedSearchMode } from 'devextreme/common';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'hp-dx-drop-down-list',
  templateUrl: './hp-dx-drop-down-list.component.html',
  styleUrls: ['./hp-dx-drop-down-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //reactive form dependencies
  //*============================
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HpDxDropDownListComponent),
    },
  ],
  //*============================
})
export class HpDxDropDownListComponent implements ControlValueAccessor {
  @ViewChild('element', { static: true }) element?: DxSelectBoxComponent;
  @ViewChild(DxSelectBoxComponent, { static: true })
  selectBox?: DxSelectBoxComponent;

  constructor(
    private readonly httpService: HttpService,
    private readonly cdr: ChangeDetectorRef
  ) {
    if (this.searchExpr == null) this.searchExpr = this.displayExpr;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  //reactive form dependencies
  //*============================
  onChanged: any = (e: any) => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;

  writeValue(val: any) {
    this.value = val;
    this.valueChange.emit(val);
    this.cdr.detectChanges();
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

  onValueChangedExtra(e: any): void {
    this.onValueChangeWithCurrentRowData.emit({
      value: e.value,
      selectedItem: this.selectedItem,
    });
    this.onValueChanged.emit(e);
    this.valueChange.emit(e.value);
    this.onChanged(e.value);
    this.cdr.detectChanges();
  }

  @Input() ngModelOptions: any = { standalone: true };
  @Input() value?: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  // Specifies whether the widget allows a user to enter a custom value. Requires the  handler implementation.
  @Input() acceptCustomValue: boolean = true;
  // Specifies the shortcut key that sets focus on the widget.
  //@Input() accessKey: string = null;
  // Specifies whether or not the widget changes its state when interacting with a user.
  @Input() activeStateEnabled: boolean = true;
  // A data source used to fetch data the widget should display.

  dataSourceValue: any = null;
  @Input() get dataSource() {
    return this.dataSourceValue;
  }

  set dataSource(value: any) {
    this.dataSourceValue = value;
    this.cdr.detectChanges();
  }
  // Specifies whether to render the drop-down field's content when it is displayed. If <strong>false</strong>, the content is rendered immediately.
  //@Input() deferRendering: boolean = true;
  // Specifies whether the widget responds to user interaction.
  // @Input() disabled: boolean = false;
  // Specifies the name of the data source item field whose value is displayed by the widget.
  @Input() displayExpr: string = `name`;

  // Specifies whether or not the drop-down editor is displayed.
  @Input() opened: boolean = false;
  // Returns the value currently displayed by the widget.
  //@Input() displayValue: string;
  // Specifies a custom template for the drop-down button.
  //@Input() dropDownButtonTemplate: any = "dropDownButton";
  // Specifies the  to be attached to the widget's root element.
  @Input() elementAttr: object = {};
  // Specifies a custom template for the text field. Must contain the  widget.
  //@Input() fieldTemplate: any = null;
  // Specifies whether the widget can be focused using keyboard navigation.
  @Input() focusStateEnabled: boolean = true;
  // Specifies whether data items should be grouped.
  //@Input() grouped: boolean = false;
  // Specifies a custom template for group captions.
  //@Input() groupTemplate: any = 'group';
  // Specifies the widget's height.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height?: number | string | Function;
  // Specifies text for a hint that appears when a user pauses on the widget.
  //@Input() hint: string = undefined;
  // Specifies whether the widget changes its state when a user pauses on it.
  @Input() hoverStateEnabled: boolean = true;
  // Specifies the attributes to be passed on to the underlying HTML element.
  @Input() inputAttr: object = {};
  // Specifies whether the editor's value is valid.
  @Input() isValid: boolean = true;
  // An array of items displayed by the widget.
  @Input() items: any[] = [];
  // Specifies a custom template for items.
  //@Input() itemTemplate: any = 'item';
  // Specifies the maximum number of characters you can enter into the textbox.
  //@Input() maxLength: string = null;
  // The minimum number of characters that must be entered into the text box to begin a search. Applies only if  is <strong>true</strong>.
  //@Input() minSearchLength: number = null;
  // The value to be assigned to the <code>name</code> attribute of the underlying HTML element.
  @Input() name: string = '';
  // The text or HTML markup displayed by the widget if the item collection is empty.
  @Input() noDataText: string = 'داده ای یافت نشد!';

  // Specifies whether or not the drop-down editor is displayed.
  //@Input() opened: boolean = false;
  // Specifies whether a user can open the drop-down list by clicking a text field.
  @Input() openOnFieldClick: boolean = true;
  // The text that is provided as a hint in the select box editor.
  @Input() placeholder: string = 'انتخاب کنید...';
  // A Boolean value specifying whether or not the widget is read-only.
  @Input() readOnly: boolean = false;
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = true;
  // Specifies whether to allow searching.
  @Input() searchEnabled: boolean = true;
  // Specifies the name of a data source item field or an expression whose value is compared to the search criterion.
  @Input() searchExpr: any = null;
  // Specifies a comparison operation used to search widget items.
  @Input() searchMode: SimplifiedSearchMode = 'contains';
  // Specifies the time delay, in milliseconds, after the last character has been typed in, before a search is executed.
  @Input() searchTimeout: number = 700;
  // Gets the currently selected item.
  @Input() selectedItem: any = null;
  // Specifies whether to display the <strong>Clear</strong> button in the widget.
  @Input() showClearButton: boolean = true;
  // Specifies whether or not the widget displays unfiltered values until a user types a number of characters exceeding the  option value.
  @Input() showDataBeforeSearch: boolean = true;
  // Specifies whether the drop-down button is visible.
  @Input() showDropDownButton: boolean = true;
  // Specifies whether or not to display selection controls.
  //@Input() showSelectionControls: boolean = false;
  // Specifies whether or not the widget checks the inner text for spelling mistakes.
  //@Input() spellcheck: boolean = false;
  // Specifies how the widget's text field is styled.
  @Input() stylingMode: EditorStyle = 'outlined';
  // Specifies the number of the element when the Tab key is used for navigating.
  @Input() tabIndex: number = 0;
  // The read-only option that holds the text displayed by the widget <strong>input</strong> element.
  @Input() text: string = '';

  @Input() dropDownOptions: any;
  // Specifies information on the validation error when using a custom validation engine. Should be changed at runtime along with the  option.
  //@Input() validationError: object = undefined;
  // Specifies how the message about the  that are not satisfied by this editor's value is displayed.
  //@Input() validationMessageMode: string = 'auto';
  // Specifies the currently selected value. May be an object if  contains objects and  is not set.
  // Specifies the  after which the widget's  should be updated. Applies only if  is set to <strong>true</strong>.
  //@Input() valueChangeEvent: string = 'change';
  // Specifies which data field provides the widget's . When this option is not set, the <strong>value</strong> is the entire data object.
  @Input() valueExpr: string = 'id';
  // Specifies whether the widget is visible.
  @Input() visible: boolean = true;
  // Specifies the widget's width.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() width?: number | string | Function;

  // A function that is executed when the widget loses focus after the content has been changed.
  //@Output() onChange = new EventEmitter<any>();
  // A function that is executed once the drop-down editor is closed.
  //@Output() onClosed = new EventEmitter<any>();
  // A function that is executed when the widget's content is ready and each time the content is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onContentReady = new EventEmitter<any>();
  // A function that is executed when the widget's input has been copied.
  //@Output() onCopy = new EventEmitter<any>();
  // A function that is executed when a user adds a custom item. Requires  to be set to <strong>true</strong>.
  //@Output() onCustomItemCreating = new EventEmitter<any>();
  // A function that is executed when the widget's input has been cut.
  //@Output() onCut = new EventEmitter<any>();
  // A function that is executed before the widget is .
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing = new EventEmitter<any>();
  // A function that is executed when the Enter key has been pressed while the widget is focused.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEnterKey = new EventEmitter<any>();
  // A function that is executed when the widget gets focus.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFocusIn = new EventEmitter<any>();
  // A function that is executed when the widget loses focus.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFocusOut = new EventEmitter<any>();
  // A function that is executed only once, after the widget is initialized.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInitialized = new EventEmitter<any>();
  // A function that is executed each time the widget's input is changed while the widget is focused.
  //@Output() onInput = new EventEmitter<any>();
  // A function that is executed when a list item is clicked or tapped.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemClick = new EventEmitter<any>();
  // A function that is executed when a user is pressing a key on the keyboard.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onKeyDown = new EventEmitter<any>();
  // A function that is executed when a user presses a key on the keyboard.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onKeyPress = new EventEmitter<any>();
  // A function that is executed when a user releases a key on the keyboard.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onKeyUp = new EventEmitter<any>();
  // A function that is executed once the drop-down editor is opened.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOpened = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClosed = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectedChange = new EventEmitter<any>();
  // A function that is executed after a widget option is changed.
  //@Output() onOptionChanged = new EventEmitter<any>();
  // A function that is executed when the widget's input has been pasted.
  //@Output() onPaste = new EventEmitter<any>();
  // A function that is executed when a list item is selected or selection is canceled.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectionChanged = new EventEmitter<any>();
  // A function that is executed after the widget's  is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onValueChanged = new EventEmitter<any>();
  // A handler for the dataSourceChange event.
  @Output() dataSourceChange = new EventEmitter<any>();

  reset() {
    this.selectBox!.instance.reset();
  }

  refresh() {
    this.selectBox!.instance.getDataSource().load();
  }

  clearValue() {
    if (this.selectBox!.instance != null) {
      this.selectBox!.instance.reset();
      if (this.dataSource != null)
        this.selectBox!.instance.getDataSource().load();
    }
  }

  // PeymanMH
  // A model for input dataSource api
  // PeymanMH
  @Input() isRequired: boolean = false;
  @Input() isRequiredMessage: string = `وارد کردن این فیلد الزامی است.`;

  @Input() dataSourceModel: any = null;
  @Input() defaultFieldXpr?: string;
  @Input() defaultValueXpr: any = null;
  @Input() openOnFocusIn: boolean = false;

  // Old Version
  @Input() listUrl?: string;
  @Input() inputModel: any = null;

  // New Version
  // @Input() loadData: LoadListRequirement;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onValueChangeWithCurrentRowData: EventEmitter<any> =
    new EventEmitter<any>();

  // change Data Source
  changeStaticDataSource(data: any): void {
    this.dataSource = null;
    this.dataSource = new ArrayStore({
      data,
      key: this.valueExpr,
    });
    this.cdr.detectChanges();
  }

  changeDataSource<T>(
    model: T,
    routingAction: string,
    hasAccess: boolean = true
  ): void {
    if (!hasAccess) return;
    this.dataSource = null;
    const dataSourceModel: any = this.buildDataSourceModel(
      model,
      routingAction
    );
    this.dataSourceModel = dataSourceModel;
    this.dataSource = this.dataSourceFill(dataSourceModel);
    this.cdr.detectChanges();
  }

  buildDataSourceModel(model: any, routingAction: string): any {
    const dataSourceModel: any = {};
    if (model != null) dataSourceModel.model = model;

    dataSourceModel.listUrl = routingAction;
    dataSourceModel.key = this.valueExpr;
    return dataSourceModel;
  }

  @Input() valueForChange: any = null;

  dataSourceFill(model: any): any {
    return new DataSource({
      store: new CustomStore({
        key: model.key,
        load: (loadOptions: any) => {
          let params: HttpParams = new HttpParams();
          [
            'skip',
            'take',
            'requireTotalCount',
            'requireGroupCount',
            'sort',
            'filter',
            'totalSummary',
            'group',
            'groupSummary',
          ].forEach((i) => {
            if (
              i in loadOptions &&
              loadOptions[i] !== undefined &&
              loadOptions[i] !== null &&
              loadOptions[i] !== ''
            )
              params = params.set(i, JSON.stringify(loadOptions[i]));
          });

          if (model.model != null) {
            model.model.searchString =
              loadOptions.searchValue == '' ? null : loadOptions.searchValue;
            model.model.pageIndex = loadOptions.skip / loadOptions.take;
            model.model.pageSize = loadOptions.take;
            model.model.orderByColumn =
              model.model.orderByColumn == null
                ? this.displayExpr
                : model.model.orderByColumn;
          }

          model.model[this.valueExpr] = null;

          const result = lastValueFrom(
            this.httpService.post(model.listUrl, model.model)
          );
          return result.then((res: any) => {
            return {
              data: res.data,
              totalCount: res.data.length,
              summary: null,
              groupCount: res.data!.length,
            };
          });
        },
        byKey: (key: any) => {
          model.model[this.valueExpr] = key;
            const res = lastValueFrom(this.httpService
              .post(model.listUrl, model.model));
          return res.then((resData: any) => {
              const res = resData.data[0];
              return res;
            });
        },
      }),
    });
  }

  onDataSourceChange(e: any): void {
    this.dataSourceChange.emit(e);
  }

  onInitializedExtra(e: any): void {
    this.onInitialized.emit(e);
  }

  onKeyUpExtra(e: any): void {
    this.onKeyUp.emit(e);
  }

  ngOnDestroy(): void {
    this.element?.instance.dispose();
    this.element = undefined;
  }

  onOpenedExtra(e: any): void {
    //select box is closes in firefox when u  use onOpened event this line will solve the problem
    if (e.component != null && e.component._popup) {
      e.component._popup.option('closeOnTargetScroll', false);
    }

    this.onOpened.emit(e);
    this.cdr.detectChanges();
  }

  selectedItemChangeExtra(e: any): void {
    this.selectedItem = e;
    const value = { value: e && e[this.valueExpr], selectedItem: e };
    this.onValueChanged.emit(value);
    this.onSelectedChange.emit(value);
    this.onChanged(value.value);
    this.cdr.detectChanges();
  }

  onFocusInExtra(e: any): void {
    this.onFocusIn.emit(e);
  }

  onFocusOutExtra(e: any): void {
    this.onFocusOut.emit(e);
  }
}
