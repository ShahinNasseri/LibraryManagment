import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  HostListener,
} from '@angular/core';
import { fsAnimations } from '@core';
import { DxPopupComponent } from 'devextreme-angular';
import { AnimationConfig } from 'devextreme/animation/fx';

@Component({
  selector: 'fs-popup',
  templateUrl: './fs-popup.component.html',
  styleUrls: ['./fs-popup.component.scss'],
  animations: fsAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPopupComponent implements OnInit, OnDestroy {
  @ViewChild('element', { static: true }) element!: DxPopupComponent;

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {}

  // A Boolean value specifying whether or not the widget is visible.
  @Input() visible: any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  onHiddenInner(e: any) {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onHidden.emit(e);
  }

  tempHeight: any;
  tempWidth: any;
  tempMaxHeight: any;
  tempMaxWidth: any;
  checkFullScreen: boolean = false;

  // Specifies the container in which to place the widget.
  @Input() container?: string = undefined;
  // Specifies the shortcut key that sets focus on the widget.
  @Input() accessKey?: string = undefined;
  // Configures widget visibility animations. This object contains two fields:  and .
  @Input() animation: {
    hide?: AnimationConfig;
    show?: AnimationConfig;
} = {};
  // A Boolean value specifying whether or not the widget is closed if a user presses the <strong>Back</strong> hardware button.
  //@Input() closeOnBackButton: boolean = true;
  // Specifies whether to close the widget if a user clicks outside it.
  @Input() closeOnOutsideClick: boolean = false;
  // Specifies a custom template for the widget content.
  @Input() contentTemplate: any = 'content';
  // Specifies whether to render the widget's content when it is displayed. If <strong>false</strong>, the content is rendered immediately.
  @Input() deferRendering: boolean = true;
  // Specifies whether the widget responds to user interaction.
  @Input() disabled: boolean = false;
  // Specifies whether or not to allow a user to drag the popup window.
  @Input() dragEnabled: boolean = true;
  // Specifies the  to be attached to the widget's root element.
  @Input() elementAttr: object = {};
  // Specifies whether the widget can be focused using keyboard navigation.
  @Input() focusStateEnabled: boolean = true;
  // A Boolean value specifying whether or not to display the widget in full-screen mode.
  @Input() fullScreen: boolean = false;
  // Specifies the widget's height in pixels.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() height: number | string | Function = 'auto';
  // Specifies text for a hint that appears when a user pauses on the widget.
  @Input() hint?: string = undefined;
  // Specifies whether the widget changes its state when a user pauses on it.
  @Input() hoverStateEnabled: boolean = false;
  // Specifies the maximum height the widget can reach while resizing.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() maxHeight: number | Function | string = '100%';
  // Specifies the maximum width the widget can reach while resizing.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() maxWidth: number | Function | string = '100%';
  // Specifies the minimum height the widget can reach while resizing.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() minHeight: number | Function | string = 0;
  // Specifies the minimum width the widget can reach while resizing.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() minWidth: number | Function | string = 0;

  @Input() enterKeyEvent: string | undefined;

  // Positions the widget.
  @Input() position: any = { my: 'center', at: 'center', of: this.container };
  // Specifies whether or not an end user can resize the widget.
  @Input() resizeEnabled: boolean = false;
  // Switches the widget to a right-to-left representation.
  @Input() rtlEnabled: boolean = true;
  // Specifies whether to shade the  when the widget is active.
  @Input() shading: boolean = true;
  // Specifies the shading color.
  @Input() shadingColor: string = '';
  // Specifies whether or not the widget displays the Close button.
  @Input() showCloseButton: boolean = true;
  // A Boolean value specifying whether or not to display the title in the popup window.
  @Input() showTitle: boolean = true;
  // Specifies the number of the element when the Tab key is used for navigating.
  @Input() tabIndex: number = 0;
  // The title in the overlay window.
  @Input() title: string = '';
  // Specifies a custom template for the widget title. Does not apply if the  is defined.
  @Input() titleTemplate: any = '  ';
  // Specifies items displayed on the top or bottom toolbar of the popup window.
  @Input() toolbarItems: any[] = [];

  @Input() menuItems: any = null;
  // Specifies the widget's width in pixels.
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() width: number | string | Function = 'auto';
  // A function that is executed when the widget's content is ready and each time the content is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onContentReady = new EventEmitter<any>();
  // A function that is executed before the widget is .
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing = new EventEmitter<any>();
  // A function that is executed after the widget is hidden.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onHidden = new EventEmitter<any>();
  // A function that is executed before the widget is hidden.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onHiding = new EventEmitter<any>();
  // A function that is executed only once, after the widget is initialized.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInitialized = new EventEmitter<any>();
  // A function that is executed after a widget option is changed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOptionChanged = new EventEmitter<any>();
  // A function that is executed each time the widget is resized by one pixel.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onResize = new EventEmitter<any>();
  // A function that is executed when resizing ends.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onResizeEnd = new EventEmitter<any>();
  // A function that is executed when resizing starts.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onResizeStart = new EventEmitter<any>();
  // A function that is executed before the widget is displayed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShowing = new EventEmitter<any>();
  // A function that is executed after the widget is displayed.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShown = new EventEmitter<any>();
  // A function that is executed when the widget's  is rendered.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onTitleRendered = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onMenuItemsClick = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChangeFullScreen = new EventEmitter<any>();

  // PeymanMH
  @Input() zIndex?: number = undefined;

  @Input() btnStyle?: string = undefined;

  // Header Button is Showing or Not
  @Input() isShowMaximizeButton: boolean = true;
  @Input() isShowCloseButton: boolean = true;
  @Input() isShowTitle: boolean = true;

  @Input() isShowDefaultButton: boolean = false;
  @Input() defaultButtonTitle: string = 'ثبت';
  @Input() defaultButtonIcon: string = 'save';
  @Input() defaultButtonType: 'normal' | 'success' | 'default' | 'danger' = 'default';
  @Output() defaultButtonOnClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() isShowSuccessButton: boolean = false;
  @Input() successButtonTitle: string = 'ثبت و جدید';
  @Input() successButtonIcon: string = 'save';
  @Input() successButtonType: 'normal' | 'success' | 'default' | 'danger' = 'success';
  @Output() successButtonOnClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() isShowNormalButton: boolean = false;
  @Input() normalButtonTitle: string = 'انصراف';
  @Input() normalButtonIcon: string = 'save';
  @Input() normalButtonType: 'normal' | 'success' | 'default' | 'danger' = 'normal';
  @Output() normalButtonOnClick: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  showOperationMenuModes: any = {
    name: 'onHover',
    delay: { show: 0, hide: 500 },
  };

  @Input() operationColumnHideMenuOnMouseLeave: boolean = true;

  public onShowingExtra(e: any) {
    this.fixPosition();

    this.onShowing.emit(e);
  }

  public fullScreenSize() {
    if (this.checkFullScreen == true) {
      this.resetPopupSize();
    } else {
      this.maximizePopup();
      this.fixPosition();
    }

    this.checkFullScreen = !this.checkFullScreen;

    this.cdr.detectChanges();
    this.onChangeFullScreen.emit(true);
  }

  private maximizePopup() {
    this.tempHeight = this.height;
    this.tempWidth = this.width;
    this.tempMaxHeight = this.maxHeight;
    this.tempMaxWidth = this.maxWidth;
    this.height = '100%';
    this.width = '100%';
    this.maxHeight = '100%';
    this.maxWidth = '100%';
  }

  private resetPopupSize() {
    this.height = this.tempHeight ?? 'auto';
    this.width = this.tempWidth ?? 'auto';
    this.maxHeight = this.tempMaxHeight ?? 'auto';
    this.maxWidth = this.tempMaxWidth ?? 'auto';
  }

  private fixPosition() {
    this.element.instance.option('position', {
      my: 'center',
      at: 'center',
      of: this.container,
    });
  }

  close() {
    this.visible = false;
    this.normalButtonOnClick.emit();
  }

  onDisposingExtra(e: any): void {
    this.onDisposing.emit(e);
  }

  onHidingExtra(e: any): void {
    this.onHiding.emit(e);
  }

  ngOnDestroy(): void {
    this.element.instance.dispose();
  }

  fullScreenChangeExtra(e: any) {
    this.fixPosition();

    this.onChangeFullScreen.emit(e);
  }

  onMenuItemClick(e: any): void {
    this.onMenuItemsClick.emit(e);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardHotkey(e: KeyboardEvent) {}
}
