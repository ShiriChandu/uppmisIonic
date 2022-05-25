import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoarsesinglePage } from './coarsesingle.page';

const routes: Routes = [
  {
    path: '',
    component: CoarsesinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoarsesinglePageRoutingModule {}
