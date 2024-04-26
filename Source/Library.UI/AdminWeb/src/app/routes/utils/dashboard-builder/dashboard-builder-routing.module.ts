import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBuilderMainComponent } from './dashboard-builder-main/dashboard-builder-main.component';

const routes: Routes = [
  { path: '', component: DashboardBuilderMainComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardBuilderRoutingModule { }
