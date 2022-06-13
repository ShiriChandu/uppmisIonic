import { Router } from '@angular/router';
import { HttpcallsserviceService } from './../../services/httpcallsservice.service';
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable use-isnan */
/* eslint-disable no-var */
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ToastserviceService } from './../../services/toastservice.service';
import { Constants } from 'src/app/common/constants';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as watermark from 'watermarkjs';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-seive',
  templateUrl: './seive.page.html',
  styleUrls: ['./seive.page.scss'],
})
export class SeivePage implements AfterViewInit  {
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
  dates: any;
  joindate: any;
  stageOfwork: any;
  remarks: any;
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
  materialSource: any;
  weightOfSample = 1000;
  weight1: any;
  weight2: any;
  weight3: any;
  weight4: any;
  weight5: any;
  weight6: any;
  weight7: any;
  weight8: any;

  cumwt1: any;
  cumwt2: any;
  cumwt3: any;
  cumwt4: any;
  cumwt5: any;
  cumwt6: any;
  cumwt7: any;
  cumwt8: any;

  retainwt1: any;
  retainwt2: any;
  retainwt3: any;
  retainwt4: any;
  retainwt5: any;
  retainwt6: any;
  retainwt7: any;
  retainwt8: any;

  paasing1: any;
  paasing2: any;
  paasing3: any;
  paasing4: any;
  paasing5: any;
  paasing6: any;
  paasing7: any;
  paasing8: any;
  total: any;
  moduls: any;

  constructor(private geolocation: Geolocation,
    private toastSer: ToastserviceService,
    private alertCtrl: AlertController,
    public camera: Camera,
    private platform: Platform,
    private httpSer: HttpcallsserviceService,
    private router: Router,
    private loadingController: LoadingController
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
     this.qcreportno = 'Qc_sgl_'+Constants.workId+'_emp'+Constants.empid;
     this.clusterName = this.detailsList[0].cluster_name;
     this.districtName = this.detailsList[0].dist_name;
     this.agencyName = this.detailsList[0].agency_name;
     this.schemeName = this.detailsList[0].package_no;
     this.agrementNo = this.detailsList[0].agreement_no;
     this.valOfContract = this.detailsList[0].tender_value;
   }
   this.dates = new Date().toISOString();
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

    watermarkImagepic2() {


      watermark([this.blobImagepic2])
      .image(watermark.text.atPos(this.xy78,this.y63,'Latitude: '+this.latitude, '10px bold', '#FF0000', 0))
      .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y83,'Longitude: '+this.longitude, '10px bold', '#FF0000', 0, 48))
    .load('assets/icon/rv.png')
    .image(watermark.text.atPos(this.xy78,this.y103,'Date: '+this.joindate, '10px bold', '#FF0000', 0, 48))


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
      return 63;
    };
    y83(coffee, metrics, context) {
      return 73;
    };
    y103(coffee, metrics, context) {
      return 83;
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

let d12;
let e12;
let f12;
let d13;
let e13;
let f13;
let d14;
let e14;
let f14;
let d15;
let e15;
let f15;
let d16;
let e16;
let f16;
let d17;
let e17;
let f17;
let d18;
let e18;
let f18;
let d19;
let e19;
let f19;













      const j9= this.weightOfSample;

      if(this.weight1 !== undefined && this.weight1 !== '' && this.weight1 !== null){


        const  c12 = parseInt(this.weight1);
        d12 = c12
      this.cumwt1 = d12;
      if(this.cumwt1 !== undefined && this.cumwt1 !== '' && this.cumwt1 !== null){
        if(d12 !== NaN){
          e12 = (d12/j9)*100;
          this.retainwt1 = e12;
          f12 =((j9-d12)/j9)*100;

          this.paasing1 = f12;

        }
      }


      }

      if(this.weight2 !== undefined && this.weight2 !== '' && this.weight2 !== null &&
      this.cumwt1 !== undefined && this.cumwt1 !== '' && this.cumwt1 !== null){


        const  c13 = parseInt(this.weight2);
        const  dd12 = parseInt(this.cumwt1);

        d13 = dd12+c13;
      this.cumwt2 = d13;
      if(this.cumwt2 !== undefined && this.cumwt2 !== '' && this.cumwt2 !== null){
        if(d13 !== NaN){
          e13 = (d13/j9)*100;
          this.retainwt2 = e13;
          f13 =((j9-d13)/j9)*100;

          this.paasing2 = f13;

        }
      }


      }

      if(this.weight3 !== undefined && this.weight3 !== '' && this.weight3 !== null &&
      this.cumwt2 !== undefined && this.cumwt2 !== '' && this.cumwt2 !== null){


        const  c14 = parseInt(this.weight3);
        const  dd13 = parseInt(this.cumwt2);

        d14 = dd13+c14;
      this.cumwt3 = d14;
      if(this.cumwt3 !== undefined && this.cumwt3 !== '' && this.cumwt3 !== null){
        if(d14 !== NaN){
          e14 = (d14/j9)*100;
          this.retainwt3 = e14;
          f14 =((j9-d14)/j9)*100;

          this.paasing3 = f14;

        }
      }


      }

      if(this.weight4 !== undefined && this.weight4 !== '' && this.weight4 !== null &&
      this.cumwt3 !== undefined && this.cumwt3 !== '' && this.cumwt3 !== null){


        const  c15 = parseInt(this.weight4);
        const  dd14 = parseInt(this.cumwt3);

        d15 = dd14+c15;
      this.cumwt4 = d15;
      if(this.cumwt4 !== undefined && this.cumwt4 !== '' && this.cumwt4 !== null){
        if(d15 !== NaN){
          e15 = (d15/j9)*100;
          this.retainwt4 = e15;
          f15 =((j9-d15)/j9)*100;

          this.paasing4 = f15;

        }
      }


      }


      if(this.weight5 !== undefined && this.weight5 !== '' && this.weight5 !== null &&
      this.cumwt4 !== undefined && this.cumwt4 !== '' && this.cumwt4 !== null){


        const  c16 = parseInt(this.weight5);
        const  dd15 = parseInt(this.cumwt4);

        d16 = dd15+c16;
      this.cumwt5 = d16;
      if(this.cumwt5 !== undefined && this.cumwt5 !== '' && this.cumwt5 !== null){
        if(d16 !== NaN){
          e16 = (d16/j9)*100;
          this.retainwt5 = e16;
          f16 =((j9-d16)/j9)*100;

          this.paasing5 = f16;

          if(f16< 34.5){
            this.remarks = 'The Tested sample Fine aggregate comes under Zone-1 as per Table-9 Clause 6.3 of IS 383-2016';
          }else if(f16<59.5){
            this.remarks ='The Tested sampleFine aggregate comes under Zone-2 as per Table-9 Clause 6.3 of IS 383-2016';
          }else if(f17<79.5){}
          this.remarks ='The Tested sample Fine aggregate comes under Zone-3 as per Table-9 Clause 6.3 of IS 383-2016';
          }else {
            this.remarks = 'The Tested sample Fine aggregate comes under Zone-4 as per Table-9 Clause 6.3 of IS 383-2016';
          }
      }


      }


      if(this.weight6 !== undefined && this.weight6 !== '' && this.weight6 !== null &&
      this.cumwt5 !== undefined && this.cumwt5 !== '' && this.cumwt5 !== null){


        const  c17 = parseInt(this.weight6);
        const  dd16 = parseInt(this.cumwt5);

        d17 = dd16+c17;
      this.cumwt6 = d17;
      if(this.cumwt6 !== undefined && this.cumwt6 !== '' && this.cumwt6 !== null){
        if(d17 !== NaN){
          e17 = (d17/j9)*100;
          this.retainwt6 = e17;
          f17 =((j9-d17)/j9)*100;

          this.paasing6 = f17;

        }
      }


      }


      if(this.weight7 !== undefined && this.weight7 !== '' && this.weight7 !== null &&
      this.cumwt6 !== undefined && this.cumwt6 !== '' && this.cumwt6 !== null){


        const  c18 = parseInt(this.weight7);
        const  dd17 = parseInt(this.cumwt6);

        d18 = dd17+c18;
      this.cumwt7 = d18;
      if(this.cumwt7 !== undefined && this.cumwt7 !== '' && this.cumwt7 !== null){
        if(d18 !== NaN){
          e18 = (d18/j9)*100;
          this.retainwt7 = e18;
          f18 =((j9-d18)/j9)*100;

          this.paasing7 = f18;

        }
      }


      }

      if(this.weight8 !== undefined && this.weight8 !== '' && this.weight8 !== null &&
      this.cumwt7 !== undefined && this.cumwt7 !== '' && this.cumwt7 !== null){


        const  c19 = parseInt(this.weight8);
        const  dd18 = parseInt(this.cumwt7);

        d19 = dd18+c19;
      this.cumwt8 = d19;
      if(this.cumwt8 !== undefined && this.cumwt8 !== '' && this.cumwt8 !== null){
        if(d19 !== NaN){
          e19 = (d19/j9)*100;
          this.retainwt8 = e19;
          f19 =((j9-d19)/j9)*100;

          this.paasing8 = f19;

        }
      }


      }







      if(e12 !== undefined && e13 !== undefined && e14 !== undefined && e15 !== undefined
         && e16!== undefined &&  e17 !== undefined && e18 !== undefined && e19 !== undefined){

          this.total = e12+e13+e14+e15+e16+e17+e18+e19;
          if(this.total !== undefined && this.total !== NaN){
          this.moduls = this.total/100;
          }


    }

    }

    submit(){
      if(this.dates === undefined){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.dates === null){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.dates === ''){
        this.toastSer.presentError('Please Enter Date of testing	')
      }else if(this.materialSource === undefined){
        this.toastSer.presentError('Please Enter Material Source			')
      }else if(this.materialSource === null){
        this.toastSer.presentError('Please Enter Material Source	')
      }else if(this.materialSource === ''){
        this.toastSer.presentError('Please Enter Material Source	')
      }
      else if(this.stageOfwork === undefined){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === null){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.stageOfwork === ''){
        this.toastSer.presentError('Please Enter Stage of work		')
      }else if(this.weight1 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 1	')
      }else if(this.weight1 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 1	')
      }else if(this.weight1 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 1	')
      }
      else if(this.weight2 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 2	')
      }else if(this.weight2 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 2	')
      }else if(this.weight2 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 2	')
      }

      else if(this.weight3 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 3	')
      }else if(this.weight3 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 3	')
      }else if(this.weight3 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 3	')
      }

      else if(this.weight4 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 4	')
      }else if(this.weight4 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 4	')
      }else if(this.weight4 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 4	')
      }

      else if(this.weight5 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 5	')
      }else if(this.weight5 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 5	')
      }else if(this.weight5 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 5	')
      }

      else if(this.weight6 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 6	')
      }else if(this.weight6 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 6	')
      }else if(this.weight6 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 6	')
      }
      else if(this.weight7 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 7	')
      }else if(this.weight7 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 7	')
      }else if(this.weight7 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 7	')
      }
      else if(this.weight8 === undefined){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 8	')
      }else if(this.weight8 === null){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 8	')
      }else if(this.weight8 === ''){
        this.toastSer.presentError('Please Enter Weight Retained (grms)	 8	')
      }


      else if(this.cumwt1 === undefined){
        this.toastSer.presentError('Please Enter Cumulative Weight retained in grms	1	')
      }else if(this.cumwt1 === null){
        this.toastSer.presentError('Please Enter Cumulative Weight retained in grms	1	')
      }else if(this.cumwt1 === ''){
        this.toastSer.presentError('Please Enter Cumulative Weight retained in grms	1	')
      }
      else if(this.retainwt1 === undefined){
        this.toastSer.presentError('Please Enter Cum % weight Retained		1	')
      }else if(this.retainwt1 === null){
        this.toastSer.presentError('Please Enter Cum % weight Retained		1	')
      }else if(this.retainwt1 === ''){
        this.toastSer.presentError('Please Enter Cum % weight Retained		1	')
      }
      else if(this.paasing1 === undefined){
        this.toastSer.presentError('Please Enter % Passing		1	')
      }else if(this.paasing1 === null){
        this.toastSer.presentError('Please Enter % Passing		1	')
      }else if(this.paasing1 === ''){
        this.toastSer.presentError('Please Enter % Passing	1	')
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
     this.autoLoader();
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
          this.httpSer.addSieveTest(Constants.workId,Constants.empid,this.dates,this.materialSource,this.stageOfwork,
            this.weight1,this.cumwt1,this.retainwt1,this.paasing1,
            this.weight2,this.cumwt2,this.retainwt2,this.paasing2,
            this.weight3,this.cumwt3,this.retainwt3,this.paasing3,
            this.weight4,this.cumwt4,this.retainwt4,this.paasing4,
            this.weight5,this.cumwt5,this.retainwt5,this.paasing5,
            this.weight6,this.cumwt6,this.retainwt6,this.paasing6,
            this.weight7,this.cumwt7,this.retainwt7,this.paasing7,
            this.weight8,this.cumwt8,this.retainwt8,this.paasing8,
            this.total,this.moduls,

            this.remarks,this.waterMarkImage.nativeElement.src,
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
          this.httpSer.addSieveTest(Constants.workId,Constants.empid,this.dates,this.materialSource,this.stageOfwork,
            this.weight1,this.cumwt1,this.retainwt1,this.paasing1,
            this.weight2,this.cumwt2,this.retainwt2,this.paasing2,
            this.weight3,this.cumwt3,this.retainwt3,this.paasing3,
            this.weight4,this.cumwt4,this.retainwt4,this.paasing4,
            this.weight5,this.cumwt5,this.retainwt5,this.paasing5,
            this.weight6,this.cumwt6,this.retainwt6,this.paasing6,
            this.weight7,this.cumwt7,this.retainwt7,this.paasing7,
            this.weight8,this.cumwt8,this.retainwt8,this.paasing8,
            this.total,this.moduls,

            this.remarks,this.waterMarkImage.nativeElement.src,
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

    autoLoader() {
      this.loadingController.create({
        spinner:'lines',
        message: 'Uploading Data. Please do not close or click back button ',
        duration: 20000
      }).then((response) => {
        response.present();
        response.onDidDismiss().then((response1) => {
          console.log('Loader dismissed', response);
        });
      });
    }

}


