import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'hp-toolbar',
  templateUrl: './hp-toolbar.component.html',
  styleUrls: ['./hp-toolbar.component.scss'],
changeDetection:ChangeDetectionStrategy.OnPush
})
export class HpToolbarComponent {
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  public ngModelValue: string = '';
  @Input()
  get ngModel(): string {
    return this.ngModelValue;
  }
  set ngModel(v: string) {
    this.ngModelValue = v;
    this.ngModelChange.emit(v);
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInsertClick = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditClick = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDeleteClick = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onRefreshClick = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSearchClick = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSearchBoxEnterKeyDown = new EventEmitter();



}
