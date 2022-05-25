import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoarsesinglePageRoutingModule } from './coarsesingle-routing.module';

import { CoarsesinglePage } from './coarsesingle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoarsesinglePageRoutingModule
  ],
  declarations: [CoarsesinglePage]
})
export class CoarsesinglePageModule {}
