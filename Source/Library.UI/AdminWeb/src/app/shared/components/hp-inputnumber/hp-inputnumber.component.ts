import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hp-inputnumber',
  templateUrl: './hp-inputnumber.component.html',
  styleUrls: ['./hp-inputnumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  //reactive form dependencies
  //*============================
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HpInputnumberComponent),
    },
  ],
  //*============================
})
export class HpInputnumberComponent implements OnInit {
  @Output() ngModelChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() ngModel: number = 0;

  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() className: string = '';

  @Input() suffix: string = '';
  @Input() prefix: string = '';
  @Input() buttonLayout: string = 'stacked'; //stacked | horizontal | vertical
  @Input() tabIndex!: string;

  @Input() minFractionDigits: number = 0;
  @Input() maxFractionDigits: number = 0;
  @Input() min!: number;
  @Input() max!: number;
  @Input() step: number = 1;

  @Input() showButtons: boolean = false;
  @Input() showClear: boolean = false;

  constructor(private cdr:ChangeDetectorRef) {

  }

  ngOnInit(): void {}

  //reactive form dependencies
  //*============================
  onChanged: any = (e: any) => {};
  onTouched: any = () => {};

  @Input() disabled: boolean = false;


  writeValue(val: number) {
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
  ngModelChangeExtra(e: number) {
    this.ngModelChange.emit(e);
    this.onChanged(e);
  }
  //*============================
}
