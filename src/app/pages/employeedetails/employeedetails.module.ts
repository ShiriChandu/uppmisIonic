import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeedetailsPageRoutingModule } from './employeedetails-routing.module';

import { EmployeedetailsPage } from './employeedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeedetailsPageRoutingModule
  ],
  declarations: [EmployeedetailsPage]
})
export class EmployeedetailsPageModule {}
