import { ToastserviceService } from './../../services/toastservice.service';
import { Constants } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formselection',
  templateUrl: './formselection.page.html',
  styleUrls: ['./formselection.page.scss'],
})
export class FormselectionPage implements OnInit {
  worklist: any = [];
  slist: any;
  workid: any;
  form: any;

  constructor(private router: Router,
    private toastSer: ToastserviceService) {
    this.worklist = Constants.schemedetailsList;
  }

  ionViewDidEnter(){
    this.worklist = Constants.schemedetailsList;
    this.clearfields();

  }

  ngOnInit() {
  }

  workchange($event){
    this.slist = [$event.target.value];
    console.log('slist',this.slist);

    if(this.slist.length>0){
      this.workid =this.slist[0].work_id;
      Constants.workName = this.slist[0].work_name;
      Constants.workId = this.slist[0].work_id;
      console.log('workid',this.workid,Constants.workName);


    }
  }

  formchange($event){
    this.form = $event.target.value;
    console.log('form: ',$event.target.value);
   }
   clearfields(){
     this.workid = null;
     this.form = null;
   }


  onClick(){
  this.router.navigate(['dashboard']);
  }

  move(){
    if(this.workid === undefined){
      this.toastSer.presentError('Please select work');
    }else if(this.form === undefined){
      this.toastSer.presentError('Please select Form');
    }else{
      if(this.form === 'Slit Content'){
        this.router.navigate(['slitcontent']);
      }else if(this.form === 'Slump Test'){
        this.router.navigate(['slumptest']);
      }else if(this.form === 'CC-Cube test for 28 days'){
        this.router.navigate(['cccube28']);
      }else if(this.form === 'Seive analysis-concrete'){
        this.router.navigate(['seive']);
      }else if(this.form === 'Coarse Aggrigate - Single size'){
        this.router.navigate(['coarsesingle']);
      }else if(this.form === 'Coarse Aggrigate - Graded(40mm)'){
        this.router.navigate(['ca40']);
      }else if(this.form === 'Coarse Aggrigate - Graded(20mm)'){
        this.router.navigate(['ca20']);
      }else if(this.form === 'Coarse Aggrigate - Graded(12.5mm)'){
        this.router.navigate(['ca12']);
      }else if(this.form === 'Steel Unit Weight test'){
        this.router.navigate(['steelunit']);
      }else if(this.form === 'Water Absorption Bricks'){
        this.router.navigate(['waterabsorption']);
      }else if(this.form === 'CC-Cube test for 7 days'){
        this.router.navigate(['cccube07']);
      }

    }
  }
}
