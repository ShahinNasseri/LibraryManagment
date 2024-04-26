import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hp-textbox',
  templateUrl: './hp-textbox.component.html',
  styleUrls: ['./hp-textbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    //reactive form dependencies
  //*============================
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HpTextboxComponent),
    },
  ],
  //*============================
})
export class HpTextboxComponent implements OnInit {
  @Input() ngModel: string = '';
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() placeholder: string = '';
  @Input() className?: string;
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';

  @Output() onClick = new EventEmitter();
  @Output() onEnterKeyDown = new EventEmitter();

  constructor(private cdr:ChangeDetectorRef) {}
  
  ngOnInit(): void {}

  onBlur(){
    this.onTouched();
  }

  //reactive form dependencies
  //*============================
  onChanged: any = (e: any) => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;


  writeValue(val: string) {
    this.ngModel = val;
    this.cdr.detectChanges();
  }
  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(val: boolean): void {
    this.disabled = val;
  }
  ngModelChangeExtra(e: string) {
    this.ngModelChange.emit(e);
    this.onChanged(e);
  }
  //*============================


}
