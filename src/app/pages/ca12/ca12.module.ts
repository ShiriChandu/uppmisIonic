import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ca12PageRoutingModule } from './ca12-routing.module';

import { Ca12Page } from './ca12.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ca12PageRoutingModule
  ],
  declarations: [Ca12Page]
})
export class Ca12PageModule {}
