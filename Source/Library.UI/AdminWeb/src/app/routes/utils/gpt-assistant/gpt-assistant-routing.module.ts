import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GptAssistantComponent } from './gpt-assistant/gpt-assistant.component';

const routes: Routes = [
  { path: '', component: GptAssistantComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GptAssistantRoutingModule { }
