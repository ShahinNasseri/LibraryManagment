import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBuilderMainComponent } from './dashboard-builder-main/dashboard-builder-main.component';
import { DashboardBuilderGridContainerComponent } from './dashboard-builder-grid-container/dashboard-builder-grid-container.component';
import { DashboardBuilderItemComponent } from './dashboard-builder-item/dashboard-builder-item.component';
import { GridstackModule } from 'gridstack/dist/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { AgGridModule } from 'ag-grid-angular';
import { HpButtonModule, HpCheckboxModule, HpDropdownModule, HpTextareaModule, HpTextboxModule } from '@shared';
import { DashboardBuilderRoutingModule } from './dashboard-builder-routing.module';


@NgModule({
  declarations: [
    DashboardBuilderMainComponent,
    DashboardBuilderGridContainerComponent,
    DashboardBuilderItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HpTextboxModule,
    HpButtonModule,
    HpDropdownModule,
    HpCheckboxModule,
    HpTextareaModule,
    DashboardBuilderRoutingModule,
    AgGridModule,
    ChartModule,
    DialogModule,
  ]
  ,exports:[
    DashboardBuilderMainComponent
  ]
})
export class DashboardBuilderModule { 
  static rootComponent = DashboardBuilderMainComponent;
}
