import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ca40Page } from './ca40.page';

const routes: Routes = [
  {
    path: '',
    component: Ca40Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ca40PageRoutingModule {}
