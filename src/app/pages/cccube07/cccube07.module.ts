import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cccube07PageRoutingModule } from './cccube07-routing.module';

import { Cccube07Page } from './cccube07.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cccube07PageRoutingModule
  ],
  declarations: [Cccube07Page]
})
export class Cccube07PageModule {}
