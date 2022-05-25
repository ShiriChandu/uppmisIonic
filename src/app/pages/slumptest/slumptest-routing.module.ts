import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlumptestPage } from './slumptest.page';

const routes: Routes = [
  {
    path: '',
    component: SlumptestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlumptestPageRoutingModule {}
