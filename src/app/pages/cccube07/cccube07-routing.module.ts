import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cccube07Page } from './cccube07.page';

const routes: Routes = [
  {
    path: '',
    component: Cccube07Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cccube07PageRoutingModule {}
