import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SteelunitPageRoutingModule } from './steelunit-routing.module';

import { SteelunitPage } from './steelunit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SteelunitPageRoutingModule
  ],
  declarations: [SteelunitPage]
})
export class SteelunitPageModule {}
