import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlitcontentPage } from './slitcontent.page';

const routes: Routes = [
  {
    path: '',
    component: SlitcontentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlitcontentPageRoutingModule {}
