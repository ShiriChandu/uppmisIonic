import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeivePage } from './seive.page';

const routes: Routes = [
  {
    path: '',
    component: SeivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeivePageRoutingModule {}
