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
    this.httpser.logionService(userid,password,'employee','').subscribe((response: any)=>{
       if(response.error === false){
           console.log('response',response.data);
           Constants.empid = response.data.emp_id;
           Constants.empName = response.data.emp_name;
           this.router.navigate(['dashboard']);
           this.postData.employeeid = '';
           this.postData.epassword = '';


         }else{
           if(response.msg === 'No Details Found.'){
            this.toastSer.presentError(response.msg);

           }else{
             Constants.empid = response.data.emp_id;
             this.httpser.updatedeviceid(Constants.empid,'employee','').subscribe((response1: any)=>{
              if(response1.error === false){
                console.log('res1',response1);

                this.httpser.logionService(userid,password,'employee','').subscribe((response2: any)=>{
                  if(response2.error === false){

                    Constants.empid = response2.data.emp_id;
                  Constants.empName = response2.data.emp_name;
                    this.router.navigate(['dashboard']);
                    this.postData.employeeid = '';
                    this.postData.epassword = '';


                  }
                });

              }
             });
           }

       }
    });
 }
}
