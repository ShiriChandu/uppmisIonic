import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ca20PageRoutingModule } from './ca20-routing.module';

import { Ca20Page } from './ca20.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ca20PageRoutingModule
  ],
  declarations: [Ca20Page]
})
export class Ca20PageModule {}
