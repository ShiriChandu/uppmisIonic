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
            this.router.navigate(['example']);

          }
        });

      }
    });


  }

}
