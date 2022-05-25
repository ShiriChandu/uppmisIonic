import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaterabsorptionPageRoutingModule } from './waterabsorption-routing.module';

import { WaterabsorptionPage } from './waterabsorption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaterabsorptionPageRoutingModule
  ],
  declarations: [WaterabsorptionPage]
})
export class WaterabsorptionPageModule {}
