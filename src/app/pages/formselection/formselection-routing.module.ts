import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormselectionPage } from './formselection.page';

const routes: Routes = [
  {
    path: '',
    component: FormselectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormselectionPageRoutingModule {}
