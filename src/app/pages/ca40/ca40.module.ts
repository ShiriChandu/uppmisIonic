import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ca40PageRoutingModule } from './ca40-routing.module';

import { Ca40Page } from './ca40.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ca40PageRoutingModule
  ],
  declarations: [Ca40Page]
})
export class Ca40PageModule {}
