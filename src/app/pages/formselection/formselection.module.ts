import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormselectionPageRoutingModule } from './formselection-routing.module';

import { FormselectionPage } from './formselection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormselectionPageRoutingModule
  ],
  declarations: [FormselectionPage]
})
export class FormselectionPageModule {}
