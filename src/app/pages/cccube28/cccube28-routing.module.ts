import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cccube28Page } from './cccube28.page';

const routes: Routes = [
  {
    path: '',
    component: Cccube28Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cccube28PageRoutingModule {}
