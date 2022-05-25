import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cccube28PageRoutingModule } from './cccube28-routing.module';

import { Cccube28Page } from './cccube28.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cccube28PageRoutingModule
  ],
  declarations: [Cccube28Page]
})
export class Cccube28PageModule {}
