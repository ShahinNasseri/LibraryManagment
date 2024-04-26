import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hp-textarea',
  templateUrl: './hp-textarea.component.html',
  styleUrls: ['./hp-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HpTextareaComponent),
    },
  ],
  //*============================
})
export class HpTextareaComponent implements OnInit , ControlValueAccessor{
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

  @Input() rows!:number;
  @Input() cols!:number;
  @Input() placeholder:string = '';
  @Input() className:string = '';
  @Input() autoResize:boolean = false;


  //reactive form dependencies
  onChanged: any = () => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;

  onBlur(){
    this.onTouched();
  }

  writeValue(val: string) {
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
