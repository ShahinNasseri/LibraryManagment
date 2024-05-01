import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxDropDownButtonComponent } from 'devextreme-angular';
import { ButtonStyle } from 'devextreme/common';

@Component({
  selector: 'fs-dropdown-button',
  templateUrl: './fs-dropdown-button.component.html',
  styleUrls: ['./fs-dropdown-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsDropdownButtonComponent implements OnInit , OnDestroy {
  @ViewChild('element', { static: true }) element!: DxDropDownButtonComponent;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
      if (this.element != null) {
          this.element.instance.dispose();
      }
  }

  @Input() style: any;

  @Input() accessKey: string = '';
  /**
   * Specifies whether or not the widget changes its state when interacting with a user.
   */
  @Input() activeStateEnabled: boolean = true;
  /**
   * Provides data for the drop-down menu.
   */
  @Input() dataSource: any;
  /**
   * Specifies whether to wait until the drop-down menu is opened the first time to render its content.
   */
  @Input() deferRendering: boolean = true;
  /**
   * Specifies whether the widget responds to user interaction.
   */
  @Input() disabled: boolean = false;
  /**
   * Specifies the data field whose values should be displayed in the drop-down menu.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() displayExpr: Function | string | undefined = 'text';
  /**
   * Specifies custom content for the drop-down field.
   */
  @Input() dropDownContentTemplate: any;
  /**
   * Configures the drop-down field.
   */
  @Input() dropDownOptions: any = null;
  /**
   * Specifies the attributes to be attached to the widget's root element.
   */
  @Input() elementAttr: any;
  /**
   * Specifies whether users can use keyboard to focus the widget.
   */
  @Input() focusStateEnabled: boolean = true;
  /**
   * Specifies the widget's height.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height: number | Function | string | undefined;
  /**
   * Specifies text for a hint that appears when a user pauses on the widget.
   */
  @Input() hint: string | undefined;
  /**
   * Specifies whether the widget changes its state when a user hovers the mouse pointer over it.
   */
  @Input() hoverStateEnabled: boolean = true;
  /**
   * Specifies the button's icon.
   */
  @Input() icon: string | undefined;
  /**
   * Provides drop-down menu items.
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @Input() items: Array<any | {
    badge?: string;
    disabled?: boolean;
    html?: string;
    icon?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick?: Function;
    template?: any;
    text?: string;
    visible?: boolean;
}> = [];
  /**
   * Specifies a custom template for drop-down menu items.
   */
  @Input() itemTemplate: any;
  /**
   * Specifies which data field provides keys used to distinguish between the selected drop-down menu items.
   */
  @Input() keyExpr: string = 'id';
  /**
   * Specifies text or HTML markup displayed in the drop-down menu when it does not contain any items.
   */
  @Input() noDataText: string | undefined;
  /**
   * Specifies whether the drop-down menu is opened.
   */
  @Input() opened: boolean | undefined;
  /**
   * Switches the widget to a right-to-left representation.
   */
  @Input() rtlEnabled: boolean = true;
  /**
   * Contains the selected item's data. Available when useSelectMode is true.
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @Input() selectedItem: any | number | string;
  /**
   * Contains the selected item's key and allows you to specify the initially selected item. Applies when useSelectMode is true.
   */
  @Input() selectedItemKey: number | string = 'selected';
  /**
   * Specifies whether the arrow icon should be displayed.
   */
  @Input() showArrowIcon: boolean = true;
  /**
   * Specifies whether to split the button in two: one executes an action, the other opens and closes the drop-down menu.
   */
  @Input() splitButton: boolean | undefined;
  /**
   * Specifies how the button is styled.
   */
  @Input() stylingMode: ButtonStyle = 'contained'; 
  /**
   * Specifies the number of the element when the Tab key is used for navigating.
   */
  @Input() tabIndex: number | undefined;
  /**
   * Specifies the button's text. Applies only if useSelectMode is false.
   */
  @Input() text: string | undefined;
  /**
   * Specifies whether the widget stores the selected drop-down menu item.
   */
  @Input() useSelectMode: boolean = true;
  /**
   * Specifies whether the widget is visible.
   */
  @Input() visible: boolean | undefined;
  /**
   * Specifies the widget's width.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() width: number | Function | string | undefined;
  /**
   * Specifies whether text that exceeds the drop-down list width should be wrapped.
   */
  @Input() wrapItemText: boolean | undefined;
  /**
   * A function that is executed when the button is clicked or tapped. If splitButton is true, this function is executed for the action button only.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>();
  /**
   * A function that is executed when the widget's content is ready and each time the content is changed.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onContentReady: EventEmitter<any> = new EventEmitter<any>();
  /**
   * A function that is executed before the widget is disposed of.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing: EventEmitter<any> = new EventEmitter<any>();
  /**
   * A function used in JavaScript frameworks to save the widget instance.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInitialized: EventEmitter<any> = new EventEmitter<any>();
  /**
   * A function that is executed when a drop-down menu item is clicked.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();
  /**
   * A function that is executed after a widget option is changed.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOptionChanged: EventEmitter<any> = new EventEmitter<any>();
  /**
   * A function that is executed when an item is selected or selection is canceled. In effect when useSelectMode is true.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() accessKeyChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() activeStateEnabledChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() dataSourceChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() deferRenderingChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() disabledChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/ban-types
  @Output() displayExprChange: EventEmitter<Function | string> = new EventEmitter<Function | string>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() dropDownContentTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() dropDownOptionsChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() elementAttrChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() focusStateEnabledChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/ban-types
  @Output() heightChange: EventEmitter<number | Function | string> = new EventEmitter<number | Function | string>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() hintChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() hoverStateEnabledChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() iconChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @Output() itemsChange: EventEmitter<any | any[]> = new EventEmitter<any | any[]>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() itemTemplateChange: EventEmitter<any> = new EventEmitter();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() keyExprChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() noDataTextChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() openedChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() rtlEnabledChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/no-redundant-type-constituents
  @Output() selectedItemChange: EventEmitter<any | number | string> = new EventEmitter<any | number | string>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  // eslint-disable-next-line max-len
  @Output() selectedItemKeyChange: EventEmitter<number | string> = new EventEmitter<number | string>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() showArrowIconChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() splitButtonChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() stylingModeChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() tabIndexChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() textChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() useSelectModeChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  @Output() visibleChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
   */
  // eslint-disable-next-line max-len, @typescript-eslint/ban-types
  @Output() widthChange: EventEmitter<number | Function | string> = new EventEmitter<number | Function | string>();
  /**
* This member supports the internal infrastructure and is not intended to be used directly from your code.
*/
}
