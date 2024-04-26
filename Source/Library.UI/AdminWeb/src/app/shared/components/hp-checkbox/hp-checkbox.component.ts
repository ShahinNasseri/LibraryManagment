import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'hp-checkbox',
  templateUrl: './hp-checkbox.component.html',
  styleUrls: ['./hp-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HpCheckboxComponent implements OnInit {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  public ngModelValue: any = false;
  @Input()
  get ngModel(): any {
    return this.ngModelValue;
  }
  set ngModel(v: any) {
    this.ngModelValue = v;
    this.ngModelChange.emit(v);
  }

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() binary: boolean = true;

  //reactive form dependencies
  onChanged: any = () => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;
  writeValue(val: any) {
    this.ngModel = val;
  }
  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  constructor() {}

  ngOnInit(): void {}
}
