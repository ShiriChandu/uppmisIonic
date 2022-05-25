import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlitcontentPageRoutingModule } from './slitcontent-routing.module';

import { SlitcontentPage } from './slitcontent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlitcontentPageRoutingModule
  ],
  declarations: [SlitcontentPage]
})
export class SlitcontentPageModule {}
