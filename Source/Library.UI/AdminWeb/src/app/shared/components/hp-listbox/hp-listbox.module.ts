import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HpListboxComponent } from './hp-listbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [HpListboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ListboxModule],
  exports: [HpListboxComponent],
})
export class HpListboxModule {}
