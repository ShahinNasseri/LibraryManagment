import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'hp-multiselect',
  templateUrl: './hp-multiselect.component.html',
  styleUrls: ['./hp-multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HpMultiselectComponent implements OnInit {
  @Input() options: any[] = [];

  @Output() ngModelChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  public ngModelValue: any[] = [];
  @Input()
  get ngModel(): any[] {
    return this.ngModelValue;
  }
  set ngModel(v: any[]) {
    this.ngModelValue = v;
    this.ngModelChange.emit(v);
  }

  @Input() name: string = '';
  @Input() isChip: boolean = false;
  @Input() optionLabel: string = '';
  @Input() defaultLabel: string = '';
  @Input() className: string = '';

  display: string = 'comma';

  //reactive form dependencies
  onChanged: any = () => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;
  writeValue(val: any[]) {
    this.ngModel = val;
  }
  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  
  constructor() {}

  ngOnInit(): void {
    if (this.isChip) {
      this.display = 'chip';
    } else {
      this.display = 'comma';
    }
  }
}
