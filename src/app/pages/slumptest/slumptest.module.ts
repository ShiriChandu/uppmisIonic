import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlumptestPageRoutingModule } from './slumptest-routing.module';

import { SlumptestPage } from './slumptest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlumptestPageRoutingModule
  ],
  declarations: [SlumptestPage]
})
export class SlumptestPageModule {}
