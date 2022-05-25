/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-example',
  templateUrl: './example.page.html',
  styleUrls: ['./example.page.scss'],
})
export class ExamplePage implements OnInit {
  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX: number;
  lastY: number;
  public photos: any;
  base64Image: any;

  currentColour: string = '#1abc9c';
  availableColours: any;

  brushSize: number = 10;
  isreadytodraw = false;

  constructor( public camera: Camera,
    ) { }

  ngOnInit() {
  }
  takePhoto()
{


  var image = new Image();

  let ctx = this.canvasElement.getContext('2d');

  const options: CameraOptions =
  {
    quality: 50, // picture quality
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  this.camera.getPicture(options) .then((imageData) =>
  {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.photos.push(this.base64Image);
      //this.photos.reverse();



      //canvas.push(this.base64Image);

      image.src=this.base64Image;

     // ctx.drawImage(image, 0, 0);

      // ctx.drawImage(image, 0, 0, image.width,    image.height,     // source rectangle
      //     0, 0, this.canvasElement.width, this.canvasElement.height);

          ctx.fillRect(78,245,75,75);


          //handleStart();

      /*image.onload = function() {
        this._CONTEXT.drawImage(image, 0, 0);
      };*/

      //this._CONTEXT.drawImage(image,0,0);

      /*this._CONTEXT.drawImage(image, 0, 0, image.width,    image.height,     // source rectangle
        0, 0, this._CANVAS.width, this._CANVAS.height);*/

    }, (err) => {
      console.log(err);
    });

    this.isreadytodraw= true;
}

handleMove(ev){

if(this.isreadytodraw !== true){
return;
}

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

}

handleStart(ev){

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
}





}
