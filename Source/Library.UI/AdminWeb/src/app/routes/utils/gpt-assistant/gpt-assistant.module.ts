import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GptAssistantComponent } from './gpt-assistant/gpt-assistant.component';
import { AgGridModule } from 'ag-grid-angular';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { HpButtonModule, HpCheckboxModule, HpDropdownModule, HpTextareaModule, HpTextboxModule } from '@shared';
import { GptAssistantRoutingModule } from './gpt-assistant-routing.module';



@NgModule({
  declarations: [GptAssistantComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HpTextboxModule,
    HpButtonModule,
    HpCheckboxModule,
    ChartModule,
    DialogModule,
    GptAssistantRoutingModule,
    HpDropdownModule,
    HpTextareaModule,
    AgGridModule
  ],
  exports:[GptAssistantComponent]
})
export class GptAssistantModule { 
  static rootComponent = GptAssistantComponent;
}
