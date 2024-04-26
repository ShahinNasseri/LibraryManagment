import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxContextMenuComponent } from 'devextreme-angular';
import { AnimationConfig } from 'devextreme/animation/fx';

@Component({
  selector: 'hp-dx-context-menu',
  templateUrl: './hp-dx-context-menu.component.html',
  styleUrls: ['./hp-dx-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HpDxContextMenuComponent {

  @ViewChild('element', { static: true }) element?: DxContextMenuComponent;

  @Input()
  dataSource: any;
  @Input()
  width: number | Function | string = 150;
  @Input()
  height?: number | Function | string;
  @Input()
  target?: string = undefined;
  @Input()
  disabled: boolean = false;
  @Input()
  rtlEnabled: boolean = true;
  @Input()
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
    hide?: AnimationConfig;
    show?: AnimationConfig;
  } = {};


  showEvent = {
    delay: 1000,
    name: "add"
  };

  @Output() onItemClick = new EventEmitter<any>();
  @Output() onHidden = new EventEmitter<any>();
  @Output() onShowing = new EventEmitter<any>();
  @Output() onShown = new EventEmitter<any>();
  @Output() onPositioning = new EventEmitter<any>();
  @Output() onDisposing = new EventEmitter<any>();
  @Output() onSelectedItemChange = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.element!.instance.dispose();
    this.element = undefined;
  }

}
