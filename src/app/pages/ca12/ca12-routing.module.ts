import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ca12Page } from './ca12.page';

const routes: Routes = [
  {
    path: '',
    component: Ca12Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ca12PageRoutingModule {}
