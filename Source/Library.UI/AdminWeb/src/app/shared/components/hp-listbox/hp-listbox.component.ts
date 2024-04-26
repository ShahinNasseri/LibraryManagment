import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'hp-listbox',
  templateUrl: './hp-listbox.component.html',
  styleUrls: ['./hp-listbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HpListboxComponent implements OnInit {
  @Input() options: any[] = [];

  @Output() ngModelChange: EventEmitter<any[]> = new EventEmitter<any>();
  public ngModelValue: any[]=[];
  @Input()
  get ngModel(): any[] {
    return this.ngModelValue;

  }
  set ngModel(v: any[]) {
    this.ngModelValue = v;
    this.ngModelChange.emit(v);
  }

  @Input() optionLabel: string = '';
  @Input() name: string = '';
  @Input() className: string = '';
  @Input() multiple: boolean = false;
  @Input() metaKeySelection: boolean = false;
  @Input() filter: boolean = false;
  

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
