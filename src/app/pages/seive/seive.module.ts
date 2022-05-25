import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeivePageRoutingModule } from './seive-routing.module';

import { SeivePage } from './seive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeivePageRoutingModule
  ],
  declarations: [SeivePage]
})
export class SeivePageModule {}
