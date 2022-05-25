import { Router } from '@angular/router';
import { HttpcallsserviceService } from './../../services/httpcallsservice.service';
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable use-isnan */
/* eslint-disable no-var */
import { AlertController, Platform } from '@ionic/angular';
import { ToastserviceService } from './../../services/toastservice.service';
import { Constants } from 'src/app/common/constants';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as watermark from 'watermarkjs';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-steelunit',
  templateUrl: './steelunit.page.html',
  styleUrls: ['./steelunit.page.scss'],
})
export class SteelunitPage implements AfterViewInit  {
  @ViewChild('previewimage') waterMarkImage: ElementRef;
  @ViewChild('previewimage2') waterMarkImage2: ElementRef;
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('canvas1') canvasEl1: ElementRef;
  @ViewChild('canvas2') canvasEl2: ElementRef;
  options1: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    allowEdit: true,
    sourceType:  this.camera.PictureSourceType.CAMERA ,


  };

  signaturePad;
  signaturePad1;
  signaturePad2;
  signatureImg: string;
  signatureImg1: string;
  signatureImg2: string;
  base641: any;
  base642: any;
  base643: any;

  qcreportno: any;
  clusterName: any;
  districtName: any;
  agencyName: any;
  schemeName: any;
  agrementNo: any;
  valOfContract: any;
  detailsList: any = [];
  date3: any;
  joindate: any;
  stageOfwork: any;
  remarks1: any;
  remarks2: any;
  remarks3: any;
  remarks4: any;
  remarks5: any;

  latitude: any;
  longitude: any;
  locationCordinates: any;
  loadingLocation: boolean;
  item56: any;
  blobImage: any;
  itemboreholepic2: any;
  blobImagepic2: any;
  contractorName: any;
  upjnName: any;
  originalImage: any;
  originalImage2pic: any;
  dates: any;
  gradeOfSteel: any;
  weight1: any;
  weight2: any;
  weight3: any;
  weight4: any;
  weight5: any;
  diff1: any;
  diff2: any;
  diff3: any;
  diff4: any;
  diff5: any;
  observation1: any;
  observation2: any;
  observation3: any;
  observation4: any;
  observation5: any;


  constructor(private geolocation: Geolocation,
    private toastSer: ToastserviceService,
    private alertCtrl: AlertController,
    public camera: Camera,
    private platform: Platform,
    private httpSer: HttpcallsserviceService,
    private router: Router
    ) {
this.setViews();
   }
   ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.signaturePad1 = new SignaturePad(this.canvasEl1.nativeElement);
    this.signaturePad2 = new SignaturePad(this.canvasEl2.nativeElement);
  }




  setViews(){
    this.getLatLong();
    this.detailsList = Constants.schemedetailsList.filter((user: any)=>user.work_name.includes(Constants.workName));
   console.log('detailslist: ',this.detailsList);
   if(this.detailsList.length>0){
     this.qcreportno = 'Qc_swtest_'+Constants.workId+'_emp'+Constants.empid;
     this.clusterName = this.detailsList[0].cluster_name;
     this.districtName = this.detailsList[0].dist_name;
     this.agencyName = this.detailsList[0].agency_name;
     this.schemeName = this.detailsList[0].package_no;
     this.agrementNo = this.detailsList[0].agreement_no;
     this.valOfContract = this.detailsList[0].tender_value;
   }
   this.date3 = new Date().toISOString();
   this.joindate =new Date().toLocaleString();

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


    locationcheck2(){
      this.getLatLong();

      if(this.latitude === undefined || this.longitude === undefined
        ||this.latitude === null || this.longitude === null||
        this.latitude === '' || this.longitude === ''){
          this.getLatLong();
              this.toastSer.presentError('Please Turn On GPS.');


      }else{
        this.imageSelection2();
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
                  //  this.addDatabase();

                  this.takeSnap();
                }

            });

          },
          },
        ],
      });
      alert.present();
    }

    async imageSelection2() {
      this.getLatLong();


      const alert = await this.alertCtrl.create({
        header: 'Choose Type',
        buttons: [
          {
            text: 'Camera',
            handler: (redc) => {

              this.platform.ready().then(() => {
                if (this.platform.is('android')) {
                  this.snap2();
                } else {
                  //  this.addDatabase();

                  this.takeSnap2();
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

    snap2(){
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
       this.itemboreholepic2 = (<any>window).Ionic.WebView.convertFileSrc(imgFileUri);

       fetch(this.itemboreholepic2)
       .then((res) => res.blob())
       .then((blob) => {
         this.blobImagepic2 = blob;
         this.watermarkImagepic2();
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


    takeSnap2() {
      this.camera.getPicture(this.options1).then(
        (imageData) => {
          this.originalImage2pic = 'data:image/jpeg;base64,' + imageData;

          fetch(this.originalImage2pic)
            .then((res) => res.blob())
            .then((blob) => {
              this.blobImagepic2 = blob;
              this.watermarkImagepic2();
            });
        },
        (error) => {
          console.log(error);
        }
      );
    }


    watermarkImage() {


      watermark([this.blobImage])
      .image(watermark.text.atPos(this.xy78,this.y63,'Latitude: '+this.latitude, '20px Josefin Slab', '#FC0535', 0.5))
      .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y83,'Longitude: '+this.longitude, '20px Josefin Slab', '#FC0535', 0.5, 48))
    .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y103,'Date: '+this.joindate, '20px Josefin Slab', '#FC0535', 0.5, 48))


    .then((img)=> {
      console.log('Base 64 of one :', img);

    //document.getElementById('lower-left').appendChild(img);


          this.waterMarkImage.nativeElement.src = img.src;
        });
    }

    watermarkImagepic2() {


      watermark([this.blobImagepic2])
      .image(watermark.text.atPos(this.xy78,this.y63,'Latitude: '+this.latitude, '20px Josefin Slab', '#FC0535', 0.5))
      .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y83,'Longitude: '+this.longitude, '20px Josefin Slab', '#FC0535', 0.5, 48))
    .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y103,'Date: '+this.joindate, '20px Josefin Slab', '#FC0535', 0.5, 48))


    .then((img)=> {
      console.log('Base 64 of one :', img);

    //document.getElementById('lower-left').appendChild(img);


          this.waterMarkImage2.nativeElement.src = img.src;
        });
    }

    xy78(coffee, metrics, context) {
      return 28;
    };
    y63(coffee, metrics, context) {
      return 143;
    };
    y83(coffee, metrics, context) {
      return 163;
    };
    y103(coffee, metrics, context) {
      return 183;
    };
    clear1() {
      this.signaturePad.clear();
    }
    clear2() {
      this.signaturePad1.clear();
    }
    clear3() {
      this.signaturePad2.clear();
    }
    startDrawing(event: Event) {
      console.log(event);
      // works in device not in browser
    }

    moved(event: Event) {
      // works in device not in browser
    }

    cumweightListioner(){
      let f12: any;
      let f13: any;
      let f14: any;
      let f15: any;
      let f16: any;



      if(this.weight1 !== undefined && this.weight1 !== '' && this.weight1 !== null){


        const  e12 = parseInt(this.weight1);

        f12= e12-395;
        if(f12!== NaN){
          this.diff1 = f12;
          if(f12 > -31.6){
            this.observation1='The results for 8 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation1 = 'The results for 8 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }

      if(this.weight2 !== undefined && this.weight2 !== '' && this.weight2 !== null){


        const  e13 = parseInt(this.weight2);

        f13= e13-617;
        if(f13!== NaN){
          this.diff2 = f13;
          if(f13 > -49.36){
            this.observation1='The results for 10 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation1 = 'The results for 10 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }

      if(this.weight3 !== undefined && this.weight3 !== '' && this.weight3 !== null){


        const  e14 = parseInt(this.weight3);

        f14= e14-888;
        if(f14!== NaN){
          this.diff3 = f14;
          if(f14 > -53.28){
            this.observation1='The results for 12 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation1 = 'The results for 12 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }
      if(this.weight4 !== undefined && this.weight4 !== '' && this.weight4 !== null){


        const  e15 = parseInt(this.weight4);

        f15= e15-1580;
        if(f15!== NaN){
          this.diff4 = f15;
          if(f15 > -94.80){
            this.observation1='The results for 16 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation1 = 'The results for 16 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }

      if(this.weight5 !== undefined && this.weight5 !== '' && this.weight5 !== null){


        const  e16 = parseInt(this.weight5);

        f16= e16-2470;
        if(f16!== NaN){
          this.diff5 = f16;
          if(f16 > -94.80){
            this.observation1='The results for 20 mm Dia of Steel confirming to specifications of IS 1786-2008'
          }else{
            this.observation1 = 'The results for 20 mm Dia of Steel not confirming to specifications of IS 1786-2008'
          }
        }


      }


    }

    submit(){
      if(this.date3 === undefined){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.date3 === null){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.date3 === ''){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.gradeOfSteel === undefined){
        this.toastSer.presentError('Please Enter Grade of steel				')
      }else if(this.gradeOfSteel === null){
        this.toastSer.presentError('Please Enter Grade of steel		')
      }else if(this.gradeOfSteel === ''){
        this.toastSer.presentError('Please Enter Grade of steel		')
      }
      else if(this.stageOfwork === undefined){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === null){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === ''){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.weight1 === undefined){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 1	')
      }else if(this.weight1 === null){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 1	')
      }else if(this.weight1 === ''){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 1	')
      }
      else if(this.weight2 === undefined){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 2	')
      }else if(this.weight2 === null){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 2	')
      }else if(this.weight2 === ''){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 2	')
      }

      else if(this.weight3 === undefined){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 3	')
      }else if(this.weight3 === null){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 3	')
      }else if(this.weight3 === ''){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 3	')
      }

      else if(this.weight4 === undefined){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 4	')
      }else if(this.weight4 === null){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 4	')
      }else if(this.weight4 === ''){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 4	')
      }

      else if(this.weight5 === undefined){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 5	')
      }else if(this.weight5 === null){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 5	')
      }else if(this.weight5 === ''){
        this.toastSer.presentError('Please Enter Standard Weight of Steel per Rmt in grms		 5	')
      }
      else if(this.remarks1 === undefined){
        this.toastSer.presentError('Please Enter Remarks 1')
      }else if(this.remarks1 === null){
        this.toastSer.presentError('Please Enter Remarks 1	')
      }else if(this.remarks1 === ''){
        this.toastSer.presentError('Please Enter Remarks 1')
      }
      else if(this.remarks2 === undefined){
        this.toastSer.presentError('Please Enter Remarks 2')
      }else if(this.remarks2 === null){
        this.toastSer.presentError('Please Enter Remarks 2	')
      }else if(this.remarks2 === ''){
        this.toastSer.presentError('Please Enter Remarks 2')
      }
      else if(this.remarks3 === undefined){
        this.toastSer.presentError('Please Enter Remarks 3')
      }else if(this.remarks3 === null){
        this.toastSer.presentError('Please Enter Remarks 3	')
      }else if(this.remarks3 === ''){
        this.toastSer.presentError('Please Enter Remarks 3')
      }
      else if(this.remarks4 === undefined){
        this.toastSer.presentError('Please Enter Remarks 4')
      }else if(this.remarks4 === null){
        this.toastSer.presentError('Please Enter Remarks 4	')
      }else if(this.remarks4 === ''){
        this.toastSer.presentError('Please Enter Remarks 4')
      }
      else if(this.remarks5 === undefined){
        this.toastSer.presentError('Please Enter Remarks 5')
      }else if(this.remarks5 === null){
        this.toastSer.presentError('Please Enter Remarks 5	')
      }else if(this.remarks5 === ''){
        this.toastSer.presentError('Please Enter Remarks 5')
      }







      else if (this.waterMarkImage.nativeElement.src === null || this.waterMarkImage.nativeElement.src === '') {
        this.toastSer.presentError('Please upload  Photograph1');
      }else if (this.waterMarkImage2.nativeElement.src === null || this.waterMarkImage2.nativeElement.src === '') {
        this.toastSer.presentError('Please upload  Photograph2');
      }else if (this.signaturePad.toDataURL() ===
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==' ) {
        this.toastSer.presentError('please Enter the Employee Signature' );
      }else if(this.contractorName === undefined){
        this.toastSer.presentError('Please Enter  Contractor Name');
      }else if(this.contractorName === null){
        this.toastSer.presentError('Please Enter  Contractor Name');
      }else if(this.contractorName === ''){
        this.toastSer.presentError('Please Enter  Contractor Name');
      }else if (this.signaturePad1.toDataURL() ===
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==' ) {
      this.toastSer.presentError('please Enter the Contractor Signature' );
    }else if(this.upjnName === undefined){
      this.toastSer.presentError('Please Enter  UPJN Name');
    }else if(this.upjnName === null){
      this.toastSer.presentError('Please Enter  UPJN Name');
    }else if(this.upjnName === ''){
      this.toastSer.presentError('Please Enter  UPJN Name');
    }else if (this.signaturePad2.toDataURL() ===
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==' ) {
    this.toastSer.presentError('please Enter the UPJN Signature' );
   }else{
     this.callService();
   }
    }
    cancel(){
      this.router.navigate(['formselection']);

    }
    callService(){
      this.platform.ready().then(() => {
        if (this.platform.is('android')) {
          if(window.navigator.connection.type === 'none'){
            this.toastSer.presentError('Please check your internet connection');
         }else{
          this.httpSer.addSteelUnitWtTest(Constants.workId,Constants.empid,this.date3,this.gradeOfSteel,this.stageOfwork,
            395,617,888,1580,2470,this.weight1,this.weight2,this.weight3,this.weight4,this.weight5,
            this.diff1,this.diff2,this.diff3,this.diff4,this.diff5,this.remarks1,this.remarks2,this.remarks3,this.remarks4,this.remarks5,
            this.waterMarkImage.nativeElement.src,
            this.waterMarkImage2.nativeElement.src,this.signaturePad.toDataURL(),this.contractorName,
            this.signaturePad1.toDataURL(),this.upjnName,this.signaturePad2.toDataURL()).subscribe((response: any)=>{
                if(response.error === false){
                  this.toastSer.presentSuccess(response.msg)
                  this.router.navigate(['formselection']);
                }else{
                  this.toastSer.presentSuccess(response.msg)

                }
              });

          }

        }else{
          this.httpSer.addSteelUnitWtTest(Constants.workId,Constants.empid,this.date3,this.gradeOfSteel,this.stageOfwork,
            395,617,888,1580,2470,this.weight1,this.weight2,this.weight3,this.weight4,this.weight5,
            this.diff1,this.diff2,this.diff3,this.diff4,this.diff5,this.remarks1,this.remarks2,this.remarks3,this.remarks4,this.remarks5,
            this.waterMarkImage.nativeElement.src,
            this.waterMarkImage2.nativeElement.src,this.signaturePad.toDataURL(),this.contractorName,
            this.signaturePad1.toDataURL(),this.upjnName,this.signaturePad2.toDataURL()).subscribe((response: any)=>{
              if(response.error === false){
                this.toastSer.presentSuccess(response.msg)
                this.router.navigate(['formselection']);
              }else{
                this.toastSer.presentSuccess(response.msg)

              }
            });


        }
      });

    }
}


