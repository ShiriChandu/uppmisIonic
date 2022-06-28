import { Constants } from 'src/app/common/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.page.html',
  styleUrls: ['./employeedetails.page.scss'],
})
export class EmployeedetailsPage implements OnInit {
  empName: any;
  contactNo: any;
  email: any;
  orgName: any;
  designation: any;
  projectCode: any;
  clusterName: any;
  districtName: any;
  constructor() {
    this.setViews();
   }

  ngOnInit() {
    this.setViews();
  }

  setViews(){
    this.empName = Constants.empName;
    this.contactNo = Constants.contactNo;
    this.email = Constants.emailId;
    this.orgName = Constants.orgName;
    this.designation = Constants.designation;
    this.projectCode = Constants.projectCode;
    this.clusterName = Constants.clusterName;
    this.districtName = Constants.distName;

  }
}
