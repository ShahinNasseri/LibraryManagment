import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DxToolbarComponent } from 'devextreme-angular';

@Component({
  selector: 'fs-toolbar',
  templateUrl: './fs-toolbar.component.html',
  styleUrls: ['./fs-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FsToolbarComponent implements OnInit , OnDestroy{
  @ViewChild('element', { static: true }) dxToolbar!: DxToolbarComponent;
  private _sanitizer: DomSanitizer = inject(DomSanitizer);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.dxToolbar.instance.dispose();
  }

  // A data source used to fetch data to be displayed by the widget.
  @Input() dataSource?: any = undefined;
  // Specifies whether the widget responds to user interaction.
  @Input() disabled: boolean = false;
  // Specifies the  to be attached to the widget's root element.
  @Input() elementAttr: object = {};
  // Specifies the widget's height.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height?: number | string | Function = undefined;
  // Specifies text for a hint that appears when a user pauses on the widget.
  @Input() hint?: string = undefined;
  // Specifies whether the widget changes its state when a user pauses on it.
  @Input() hoverStateEnabled: boolean = false;
  // The time period in milliseconds before the <strong>onItemHold</strong> event is raised.
  @Input() itemHoldTimeout: number = 750;
  // An array of items displayed by the widget.
  @Input() items?: any;

  _itemsExtra: any;
  @Input()
  get itemsExtra(): any[] {
    return this._itemsExtra;
  }
  set itemsExtra(value: any) {
    this._itemsExtra = value;
    this.feedItemsByItemsExtra();
  }

  // Specifies a custom template for items.
  @Input() itemTemplate: any = 'item';
  // Specifies a custom template for menu items.
  @Input() menuItemTemplate: any = 'menuItem';

  //@Input() filterMenuItemTemplate: any = "filterMenuItems";
  // The text or HTML markup displayed by the widget if the item collection is empty.
  @Input() noDataText: string = 'No data to display';

  @Input() showTemplate: boolean = true;

  // Informs the widget about its location in a view HTML markup.
  @Input() renderAs: string = 'topToolbar';
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = false;
  // Specifies whether the widget is visible.
  @Input() visible: boolean = true;
  // Specifies the widget's width.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() width?: number | string | Function = undefined;

  @Input() class: any = 'fa-icon-toolbar';
  @Input() style: any = '';

  // A function that is executed when the widget's content is ready and each time the content is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onContentReady = new EventEmitter<any>();
  // A function that is executed before the widget is .
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing = new EventEmitter<any>();
  // A function that is executed only once, after the widget is initialized.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInitialized = new EventEmitter<any>();
  // A function that is executed when a collection item is clicked or tapped.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemClick = new EventEmitter<any>();
  // A function that is executed when a collection item is right-clicked or pressed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemContextMenu = new EventEmitter<any>();
  // A function that is executed when a collection item has been held for a .
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemHold = new EventEmitter<any>();
  // A function that is executed after a collection item is rendered.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemRendered = new EventEmitter<any>();
  // A function that is executed after a widget option is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOptionChanged = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFocusedRowChanged = new EventEmitter<any>();

  @Output() menuItemChange: EventEmitter<any> = new EventEmitter<any>();

  menuItemValue: any[] = [];
  @Input()
  get menuItem() {
    return this.menuItemValue;
  }

  set menuItem(val: any) {
    this.menuItemValue = val;
    this.menuItemChange.emit(this.menuItemValue);
    this._cdr.detectChanges();
  }

  @Input() menuItemDisplayExpr: string = 'name';

  @Input() hideMenuOnMouseLeave: boolean = true;

  onClickItem(e: any, info: any) {
    this.onClickMenuItem.emit({ e, i: info });
  }

  @Input()
  showMenuModes: any = {
    name: 'onHover',
    delay: { show: 0, hide: 500 },
  };

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClickMenuItem = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEnterKeySearch = new EventEmitter<any>();

  public refreshDetection(){
    this._cdr.detectChanges();
  }

  private feedItemsByItemsExtra() {
    
    if (this.itemsExtra != null) {
      this.items = [];
      for (let index = 0; index < this.itemsExtra.length; index++) {
        const item = this.itemsExtra[index];

        switch (item?.type?.toLowerCase()) {
          case 'insert':
              this.items!.push(this.insertBtn(item));
            break;
          case 'globalsearch':
            this.items!.push(this.searchTextBox(item));
            break;
          case 'archiveswitch':
              this.items!.push(this.archiveSwitch(item));
            break;
          default:
            this.items!.push(item);
            break;
        }
        this._cdr.detectChanges();
      }
    }
  }


  private insertBtn(item: any): object {
    return {
      widget: 'dxButton',
      location: item.location ?? 'after',
      options: {
        text: item?.options?.text ?? 'Insert',
        icon: item?.options?.icon ?? 'add',
        type: item?.options?.type ?? 'default',
        onClick: item?.onClick ?? item?.options?.onClick,
      },
    };
  }

  private searchTextBox(item: any): object {
    return {
      widget: 'dxTextBox',
      location: item.location ?? 'before',
      options: {
        rtlEnabled: true,
        showClearButton: item.options.showClearButton ?? 'true',
        placeholder: item.options.placeholder ?? 'Search ...',
        mode: item.options.mode ?? 'search',
        hint: item.options.hint ?? 'Search in all fields',
        valueChangeEvent: item.options.valueChangeEvent ?? 'keyup',
        onValueChanged: item?.onValueChanged ?? item?.options?.onValueChanged,
      },
    };
  }

  private archiveSwitch(item: any): object {
    return {
      template: 'switchTemplate',
      location: item.location ?? 'before',
      switchOptions: {
        switchedOffText: item?.switchOptions?.switchedOffText ?? 'All',
        switchedOnText: item?.switchOptions?.switchedOnText ?? 'Deleted',
        width: item?.switchOptions?.width ?? '80px',
        onValueChanged:
          item?.onValueChanged ?? item?.switchOptions?.onValueChanged,
      },
    };
  }

  // dxButton
  // dxAutocomplete
  // dxCheckBox
  // dxDateBox
  // dxMenu
  // dxSelectBox
  // dxTabs
  // dxTextBox
  // dxButtonGroup
  // dxDropDownButton
}
