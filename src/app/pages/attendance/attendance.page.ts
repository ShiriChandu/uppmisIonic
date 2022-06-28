import { Router } from '@angular/router';
import { Constants } from 'src/app/common/constants';
/* eslint-disable max-len */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as watermark from 'watermarkjs';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { ToastserviceService } from './../../services/toastservice.service';
import { HttpcallsserviceService } from 'src/app/services/httpcallsservice.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  @ViewChild('previewimage') waterMarkImage: ElementRef;
  options1: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    allowEdit: true,
    sourceType:  this.camera.PictureSourceType.CAMERA ,


  };

  latitude: any;
  longitude: any;
  locationCordinates: any;
  loadingLocation: boolean;
  item56: any;
  blobImage: any;
  originalImage: any;
  joindate: any;


  isam = false;
  ispm = false;
  isType = true;
  isphoto = false;
  btnLayout = true;
  isdepend = false;
  btnLayout2 = false;
type: any;
loginTime: any;
loginText: any;
logoutTime: any;
logoutText: any;
  constructor(private geolocation: Geolocation,
    private toastSer: ToastserviceService,
    private alertCtrl: AlertController,
    public camera: Camera,
    private platform: Platform,
    private router: Router,
    private httpServ: HttpcallsserviceService) {
    this.getLatLong();
    this.joindate =new Date().toLocaleString();
    this.setViews();
   }

  ngOnInit() {

  }
  setViews(){
    if(Constants.amtype === 'Office' || Constants.amtype === 'Site'){
      this.isdepend = false;
    }else{
      this.isdepend = true;
    }
    if(Constants.amtype === 'Leave'){
      this.loginTime = 'On Leave';
      this.isam = true;
      this.ispm = true;
      this.isType = false;
      this.isphoto = false;
      this.btnLayout = false;
    }

    if(Constants.amtype === 'Office' || Constants.amtype === 'Site'){
      this.isType = true;
      if(Constants.logintime !== ''){
        this.loginTime = Constants.amtype + ' Log-in';
        this.loginText = Constants.logintime;
        this.isam = true;
        this.isType = true;
        this.btnLayout = true;

      }else{
        this.loginTime = '';
        this.loginText = '';
        this.isam = false;
      }

      if(Constants.logoutTime !== ''){
        if(Constants.logoutTime !== '00:00:00'){
          this.logoutTime = Constants.pmtype+' Log-out';
          this.logoutTime = Constants.logoutTime;
          this.ispm = true;
          this.loginTime = Constants.amtype + ' Log-in';
          this.loginText = Constants.logintime;
          this.isam = true;

          this.isType = false;
          this.btnLayout = false;

        }else{
          this.logoutTime = '';
          this.logoutText = '';
          this.ispm = false;
          this.isType = true;
          this.btnLayout = true;
        }
      }else{
        this.logoutTime = '';
        this.logoutText = '';
        this.ispm = false;
        this.btnLayout = true;
      }
    }

    if(Constants.logoutTime !== '' && Constants.logoutTime !== '00:00:00' && Constants.logintime !== ''){
      this.loginTime = Constants.amtype+' Log-in';
      this.loginText = Constants.logintime;
      this.isam = true;
      this.logoutTime = Constants.pmtype + ' Log-out';
      this.logoutText = Constants.logoutTime;
      this.ispm = true;
      this.isType = false;
      this.isphoto = false;
      this.btnLayout = false;
    }

  }

  typeChange($event){
    this.type = $event.target.value;
   console.log($event.target.value);
   if(this.type === 'Site'){
     this.isphoto = true;
     this.btnLayout = true;
     this.btnLayout2 = false;
   }else if(this.type === 'Office'){
     this.isphoto = true;
     this.btnLayout = true;
     this.btnLayout2 = false;

   }else if(this.type === 'Leave'){
    this.isphoto = false;
    this.btnLayout = false;
    this.btnLayout2 = true;

  }
  }
  submit(){
    if(this.type === undefined){
      this.toastSer.presentError('Please Select Type	');

    }else if(this.type === null){
      this.toastSer.presentError('Please Select Type	');

    }else if(this.type === ''){
      this.toastSer.presentError('Please Select Type	');
    }else if (this.waterMarkImage.nativeElement.src === null || this.waterMarkImage.nativeElement.src === '') {
      this.toastSer.presentError('Please upload Photo');
    }else{
      if(Constants.logintime === ''){
        this.httpServ.epmAttendance(Constants.empid,'ionic',this.waterMarkImage.nativeElement.src,this.type,this.latitude,this.longitude).subscribe((response: any)=>{
          console.log('response',response);
          if(response.error === false){
            this.toastSer.presentSuccess(response.msg);
            this.router.navigate(['dashboard']);

          }else{
            this.toastSer.presentError(response.msg);

          }
        });

      } else if (Constants.logoutTime === '00:00:00') {
        this.httpServ.epmAttendancePM(Constants.empid,'ionic',this.waterMarkImage.nativeElement.src,'',this.type,this.latitude,this.longitude,'').subscribe((response: any)=>{
          console.log('response',response);
          if(response.error === false){
            this.toastSer.presentSuccess(response.msg);
            this.router.navigate(['dashboard']);

          }else{
            this.toastSer.presentError(response.msg);

          }
        });

      }

    }

  }
  cancel(){
    this.router.navigate(['dashboard']);

  }
  submit1(){
    if(this.type === undefined){
      this.toastSer.presentError('Please Select Type	');

    }else if(this.type === null){
      this.toastSer.presentError('Please Select Type	');

    }else if(this.type === ''){
      this.toastSer.presentError('Please Select Type	');

    }else{
      this.httpServ.epmAttendance(Constants.empid,'ionic','',this.type,this.latitude,this.longitude).subscribe((response: any)=>{
        console.log('response',response);
        if(response.error === false){
          this.toastSer.presentSuccess(response.msg);
          this.router.navigate(['dashboard']);

        }else{
          this.toastSer.presentError(response.msg);

        }
      });

    }


  }
  cancel1(){
    this.router.navigate(['dashboard']);

  }
  getLatLong() {
    console.log('Easting,northing');
    this.loadingLocation = true;

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        console.log(resp);
        this.locationCordinates = resp.coords;
        this.loadingLocation = false;
        this.latitude = this.locationCordinates.latitude;
        this.longitude = this.locationCordinates.longitude;
        console.log('lati',this.latitude);
      });
    }
    locationcheck(){
      this.getLatLong();

      if(this.latitude === undefined || this.longitude === undefined
        ||this.latitude === null || this.longitude === null||
        this.latitude === '' || this.longitude === ''){
          this.getLatLong();
              this.toastSer.presentError('Please Turn On GPS.');


      }else{
        this.imageSelection();
      }
    }
    async imageSelection() {
      this.getLatLong();


      const alert = await this.alertCtrl.create({
        header: 'Choose Type',
        buttons: [
          {
            text: 'Camera',
            handler: (redc) => {

              this.platform.ready().then(() => {
                if (this.platform.is('android')) {
                  this.snap();
                } else {

                  this.takeSnap();
                }

            });

          },
          },
        ],
      });
      alert.present();
    }

    snap(){
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 320,
        targetWidth: 320,
        correctOrientation: true,

        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options).then((imgFileUri) => {
       // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
       this.item56 = (<any>window).Ionic.WebView.convertFileSrc(imgFileUri);

       fetch(this.item56)
       .then((res) => res.blob())
       .then((blob) => {
         this.blobImage = blob;
         this.watermarkImage();
       });

      }, (err) => {
       console.log(err);
      });

    }

    takeSnap() {
      this.camera.getPicture(this.options1).then(
        (imageData) => {
          this.originalImage = 'data:image/jpeg;base64,' + imageData;

          fetch(this.originalImage)
            .then((res) => res.blob())
            .then((blob) => {
              this.blobImage = blob;
              this.watermarkImage();
            });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    watermarkImage() {


      watermark([this.blobImage])
      .image(watermark.text.atPos(this.xy78,this.y63,'Latitude: '+this.latitude, '10px bold', '#FF0000', 0))
      .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y83,'Longitude: '+this.longitude, '10px bold', '#FF0000', 0, 48))
    .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y103,'Date: '+this.joindate, '10px bold', '#FF0000', 0, 48))


    .then((img)=> {
      console.log('Base 64 of one :', img);

    //document.getElementById('lower-left').appendChild(img);


          this.waterMarkImage.nativeElement.src = img.src;
        });
    }

    xy78(coffee, metrics, context) {
      return 28;
    };
    y63(coffee, metrics, context) {
      return 63;
    };
    y83(coffee, metrics, context) {
      return 73;
    };
    y103(coffee, metrics, context) {
      return 83;
    };



}
