import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ca20Page } from './ca20.page';

const routes: Routes = [
  {
    path: '',
    component: Ca20Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ca20PageRoutingModule {}
