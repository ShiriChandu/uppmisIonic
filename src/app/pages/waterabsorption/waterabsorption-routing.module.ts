import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaterabsorptionPage } from './waterabsorption.page';

const routes: Routes = [
  {
    path: '',
    component: WaterabsorptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterabsorptionPageRoutingModule {}
