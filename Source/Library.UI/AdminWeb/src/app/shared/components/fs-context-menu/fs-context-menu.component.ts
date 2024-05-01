import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxContextMenuComponent } from 'devextreme-angular';

@Component({
  selector: 'fs-context-menu',
  templateUrl: './fs-context-menu.component.html',
  styleUrls: ['./fs-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsContextMenuComponent implements OnInit , OnDestroy {

  @ViewChild('element', { static: true }) element!: DxContextMenuComponent;

  @Input()
  dataSource: any;
  @Input()
  // eslint-disable-next-line @typescript-eslint/ban-types
  width: number | Function | string = 150;
  @Input()
  // eslint-disable-next-line @typescript-eslint/ban-types
  height: number | Function | string | undefined;
  @Input()
  target: any;
  @Input()
  disabled: boolean = false;
  @Input()
  rtlEnabled: boolean = true;
  @Input()
  // eslint-disable-next-line @typescript-eslint/ban-types
  closeOnOutsideClick: boolean | Function = true;
  @Input()
  position: any = { my: 'top left', at: 'top left' };
  //= {
  //at: { x: 'left', y: 'botton' },
  //my: { x: 'left', y: 'botton' }
  //boundaryOffset: {x:100,y:100}
  //};

  @Input()
  animation: {
    hide?: object;
    show?: object;
  } ={};


  showEvent = {
    delay: 1000,
    name: 'add'
  };
  //={
  //  hide: {
  //  type: "pop"
  //  },
  //  show: {
  //    type: 'pop'
  //  }
  //};

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemClick = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onHidden = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShowing = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShown = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPositioning = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDisposing = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onItemContextMenu = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.element.instance.dispose();
  }
}
