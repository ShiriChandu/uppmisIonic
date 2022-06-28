import { HttpcallsserviceService } from './../services/httpcallsservice.service';
import { ToastserviceService } from './../services/toastservice.service';
import { Component } from '@angular/core';
import { Constants } from '../common/constants';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public postData = {
    employeeid: '',
    epassword: '',
  };


  constructor(private toastSer: ToastserviceService,
    private platform: Platform,
    private httpser: HttpcallsserviceService,
    private router: Router) {}
  callloginservice(){
    if(this.postData.employeeid.length<=0){
      this.toastSer.presentError('Please enter  Username');
    }else if(this.postData.epassword.length <=0){
      this.toastSer.presentError('Please enter  Password');

    }else{
      Constants.loginUserName = this.postData.employeeid;
      Constants.loginPassword = this.postData.epassword;

      this. platform.ready().then(() => {
        if (this.platform.is('android')) {
          if(window.navigator.connection.type === 'none'){
            this.toastSer.presentError('Please check your internet connection');
         }else{
            this.serviceCall(this.postData.employeeid,this.postData.epassword);

          }

        }else{
          this.serviceCall(this.postData.employeeid,this.postData.epassword);

        }
      });

    }
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
           this.router.navigate(['dashboard']);
           this.postData.employeeid = '';
           this.postData.epassword = '';


      }else{
        this.toastSer.presentError(response.msg);

       }
    });
 }
}
