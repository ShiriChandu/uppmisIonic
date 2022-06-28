import { ToastserviceService } from './../../services/toastservice.service';
import { HttpcallsserviceService } from './../../services/httpcallsservice.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constants';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  empName: any;
  constructor(private router: Router,
    private alertCtrl: AlertController,
    private httpser: HttpcallsserviceService,
    private platform: Platform,
    private toastSer: ToastserviceService) {
    this.empName = Constants.empName;
   }

   ionViewDidEnter(){
    this.empName = Constants.empName;

   }
  ngOnInit() {
  }

  logOut(){
    this.callalert();
  }
  async callalert() {
    const alert = await this.alertCtrl.create({
      header: 'Log out',
      subHeader: 'Are you sure want to logout ?',
      buttons: [
        {
          text: 'Yes',
          handler: (redc) => {
            this.router.navigate(['home']);

          },
        },
        {
          text: 'No',
        },
      ],
    });
    alert.present();
  }

  movetoReports(){
    this. platform.ready().then(() => {
      if (this.platform.is('android')) {
        if(window.navigator.connection.type === 'none'){
          this.toastSer.presentError('Please check your internet connection');
       }else{
        this.httpser.getSchemeDetails(Constants.empid).subscribe((response: any)=>{
          if(response.error === false){
            console.log('response',response);

            Constants.schemedetailsList = response.data;
            this.router.navigate(['formselection']);

          }
        });

       }
      }else{
        this.httpser.getSchemeDetails(Constants.empid).subscribe((response: any)=>{
          if(response.error === false){
            console.log('response',response);
            Constants.schemedetailsList = response.data;
            this.router.navigate(['formselection']);

          }
        });

      }
    });


  }
  moveToattendance(){
 this.serviceCall(Constants.loginUserName,Constants.loginPassword);


  }
  moveTodetails(){
    this.router.navigate(['employeedetails']);

  }

  serviceCall(userid: any, password: any){
    this.httpser.logionService(userid,password,'employee','ionic').subscribe((response: any)=>{
       if(response.error === false){
           console.log('response',response.data);
           Constants.empid = response.data.emp_id;
           Constants.empName = response.data.emp_name;
           Constants.projectId = response.data.project_id;
           Constants.projectCode = response.data.project_code;
           Constants.clusterId = response.data.cluster_id;
           Constants.clusterName = response.data.cluster_name;
           Constants.distName = response.data.dist_name;
           Constants.contactNo = response.data.contact_number;
           Constants.emailId = response.data.emailid;
           Constants.orgName = response.data.organization_name;
           Constants.designation = response.data.designation;
           Constants.empCode = response.data.emp_code;
           Constants.logintime = response.data.log_in_time;
           Constants.logoutTime = response.data.log_out_time;
           Constants.amtype = response.data.am_type;
           Constants.pmtype = response.data.pm_type;
           this.router.navigate(['attendance']);

      }else{
        this.toastSer.presentError(response.msg);

       }
    });
 }


}
