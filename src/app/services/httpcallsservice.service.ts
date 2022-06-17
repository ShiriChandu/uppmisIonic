/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpcallsserviceService {

  constructor(public httpClient: HttpClient) {}

  logionService(username: any, password: any, type: any,deviid) {
    const parameters = { empusername: username, empuserpwd: password,logintype: type,device_id: deviid };
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/emplogin`,
      JSON.stringify(parameters)
    );
  }
  updatedeviceid(empid: any,type: any,devid: any) {
    const parameters = { id: empid,logintype: type,device_id:devid};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/update_deviceid`,
      JSON.stringify(parameters)
    );
  }

  getSchemeDetails(empid: any) {
    const parameters = { emp_id: empid};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/getSchemeDetails`,
      JSON.stringify(parameters)
    );
  }

  addSlitContent(workid: any,empid: any,dateoftest: any,stagework: any,matetype: any,samplevl1: any,
    samplevl2: any,slitvol1: any,slitvol2: any,to1: any,t2: any,avg: any,rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: dateoftest,stage_work:stagework,
      material_type: matetype,sample_vol1: samplevl1,sample_vo12: samplevl2,slit_vol1: slitvol1,
      slit_vol2: slitvol2,tot1: to1,tot2: t2,avg_result: avg,remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addSlitContent`,
      JSON.stringify(parameters)
    );
  }
  addSlumpTest(workid: any,empid: any,dateoftest: any,grades: any,stagework: any,
    ht: any,slumpdiff: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: dateoftest,grade: grades,
      stage_work:stagework,height: ht,slump_diff: slumpdiff,
      remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addSlumpTest`,
      JSON.stringify(parameters)
    );
  }

  addCC_Cube_28Test(workid: any,empid: any,deptname: any,qunt: any,grades: any,stagework: any,noofsamp: any,
    castdate1: any,testdate1: any,age1: any,den1,lod1: any,str1: any,avg: any,charstr1: any,
    smpl1: any,
    castdate2: any,testdate2: any,age2: any,den2,lod2: any,str2: any,charstr2: any,smpl2: any,
    castdate3: any,testdate3: any,age3: any,den3,lod3: any,str3: any,charstr3: any,smpl3: any,
    rems: any,cub1: any,cub2: any,cub3: any,
    pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,dept_name: deptname,quantity:qunt,
      grade: grades,stage_work:stagework,samples: noofsamp,
      casting_date1: castdate1,testing_date1:testdate1,cube_age1:age1,cube1: cub1,density1:den1,load1:lod1,strength1: str1,avg1: avg,char_strength1:charstr1,sample1: smpl1,
      casting_date2: castdate2,testing_date2:testdate2,cube_age2:age2,cube2: cub2,density2:den2,load2:lod2,strength2: str2,char_strength2:charstr2,sample2: smpl2,
      casting_date3: castdate3,testing_date3:testdate3,cube_age3:age3,cube3: cub3,density3:den3,load3:lod3,strength3: str3,char_strength3:charstr3,sample3: smpl3,
      observation: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCC_Cube_28Test`,
      JSON.stringify(parameters)
    );
  }

  addCASingleSizeTest(workid: any,empid: any,date: any,material: any,sizes: any,stagework: any,
    wt1: any,cwt1: any,retain1: any,passing1: any,
    wt2: any,cwt2: any,retain2: any,passing2: any,
    wt3: any,cwt3: any,retain3: any,passing3: any,
    wt4: any,cwt4: any,retain4: any,passing4: any,
    wt5: any,cwt5: any,retain5: any,passing5: any,
    wt6: any,cwt6: any,retain6: any,passing6: any,
    wt7: any,cwt7: any,retain7: any,passing7: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date,material_source: material,size: sizes,stage_work: stagework,
      wt_1:wt1,cwt_1: cwt1,cwt_r1: retain1,cwt_p1:passing1,
      wt_2:wt2,cwt_2: cwt2,cwt_r2: retain2,cwt_p2:passing2,
      wt_3:wt3,cwt_3: cwt3,cwt_r3: retain3,cwt_p3:passing3,
      wt_4:wt4,cwt_4: cwt4,cwt_r4: retain4,cwt_p4:passing4,
      wt_5:wt5,cwt_5: cwt5,cwt_r5: retain5,cwt_p5:passing5,
      wt_6:wt6,cwt_6: cwt6,cwt_r6: retain6,cwt_p6:passing6,
      wt_7:wt7,cwt_7: cwt7,cwt_r7: retain7,cwt_p7:passing7,


     remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCASingleSizeTest`,
      JSON.stringify(parameters)
    );
  }

  addCAGrade40Test(workid: any,empid: any,date: any,material: any,sizes: any,stagework: any,
    wt1: any,cwt1: any,retain1: any,passing1: any,
    wt2: any,cwt2: any,retain2: any,passing2: any,
    wt3: any,cwt3: any,retain3: any,passing3: any,
    wt4: any,cwt4: any,retain4: any,passing4: any,
    wt5: any,cwt5: any,retain5: any,passing5: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date,material_source: material,size: sizes,stage_work: stagework,
      wt_1:wt1,cwt_1: cwt1,cwt_r1: retain1,cwt_p1:passing1,
      wt_2:wt2,cwt_2: cwt2,cwt_r2: retain2,cwt_p2:passing2,
      wt_3:wt3,cwt_3: cwt3,cwt_r3: retain3,cwt_p3:passing3,
      wt_4:wt4,cwt_4: cwt4,cwt_r4: retain4,cwt_p4:passing4,
      wt_5:wt5,cwt_5: cwt5,cwt_r5: retain5,cwt_p5:passing5,

     remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCAGrade40Test`,
      JSON.stringify(parameters)
    );
  }

  addCAGrade20Test(workid: any,empid: any,date: any,material: any,sizes: any,stagework: any,
    wt1: any,cwt1: any,retain1: any,passing1: any,
    wt2: any,cwt2: any,retain2: any,passing2: any,
    wt3: any,cwt3: any,retain3: any,passing3: any,
    wt4: any,cwt4: any,retain4: any,passing4: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date,material_source: material,size: sizes,stage_work: stagework,
      wt_1:wt1,cwt_1: cwt1,cwt_r1: retain1,cwt_p1:passing1,
      wt_2:wt2,cwt_2: cwt2,cwt_r2: retain2,cwt_p2:passing2,
      wt_3:wt3,cwt_3: cwt3,cwt_r3: retain3,cwt_p3:passing3,
      wt_4:wt4,cwt_4: cwt4,cwt_r4: retain4,cwt_p4:passing4,
     remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCAGrade20Test`,
      JSON.stringify(parameters)
    );
  }

  addCAGrade12_5Test(workid: any,empid: any,date: any,material: any,sizes: any,stagework: any,
    wt1: any,cwt1: any,retain1: any,passing1: any,
    wt2: any,cwt2: any,retain2: any,passing2: any,
    wt3: any,cwt3: any,retain3: any,passing3: any,
    wt4: any,cwt4: any,retain4: any,passing4: any,
    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date,material_source: material,size: sizes,stage_work: stagework,
      wt_1:wt1,cwt_1: cwt1,cwt_r1: retain1,cwt_p1:passing1,
      wt_2:wt2,cwt_2: cwt2,cwt_r2: retain2,cwt_p2:passing2,
      wt_3:wt3,cwt_3: cwt3,cwt_r3: retain3,cwt_p3:passing3,
      wt_4:wt4,cwt_4: cwt4,cwt_r4: retain4,cwt_p4:passing4,
     remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCAGrade12_5Test`,
      JSON.stringify(parameters)
    );
  }

  addSieveTest(workid: any,empid: any,date: any,material: any,stagework: any,
    wt1: any,cwt1: any,retain1: any,passing1: any,
    wt2: any,cwt2: any,retain2: any,passing2: any,
    wt3: any,cwt3: any,retain3: any,passing3: any,
    wt4: any,cwt4: any,retain4: any,passing4: any,
    wt5: any,cwt5: any,retain5: any,passing5: any,
    wt6: any,cwt6: any,retain6: any,passing6: any,
    wt7: any,cwt7: any,retain7: any,passing7: any,
    wt8: any,cwt8: any,retain8: any,passing8: any,
    tot: any,mod: any,

    rems: any,pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date,material_source: material,stage_work: stagework,
      wt_1:wt1,cwt_1: cwt1,cwt_r1: retain1,cwt_p1:passing1,
      wt_2:wt2,cwt_2: cwt2,cwt_r2: retain2,cwt_p2:passing2,
      wt_3:wt3,cwt_3: cwt3,cwt_r3: retain3,cwt_p3:passing3,
      wt_4:wt4,cwt_4: cwt4,cwt_r4: retain4,cwt_p4:passing4,
      wt_5:wt5,cwt_5: cwt5,cwt_r5: retain5,cwt_p5:passing5,
      wt_6:wt6,cwt_6: cwt6,cwt_r6: retain6,cwt_p6:passing6,
      wt_7:wt7,cwt_7: cwt7,cwt_r7: retain7,cwt_p7:passing7,
      wt_88:wt8,cwt_88: cwt8,cwt_r88: retain8,cwt_p88:passing8,
      total: tot,modulus: mod,

     remarks: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addSieveTest`,
      JSON.stringify(parameters)
    );
  }

  addSteelUnitWtTest(workid: any,empid: any,date: any,grades: any,stagework: any,
    wt1: any,wt2: any,wt3: any,wt4: any,wt5: any,
    pwt1: any,pwt2: any,pwt3: any,pwt4: any,pwt5: any,
    re1: any,re2: any,re3: any,re4: any,re5: any,
    rms1: any,rms2: any,rms3: any,rms4: any,rms5: any,
    pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date, grade: grades,stage_work: stagework,
      wt_1: wt1,wt_2: wt2,wt_3: wt3,wt_4: wt4,wt_5: wt5,
      pwt_1:pwt1,pwt_2:pwt2,pwt_3:pwt3,pwt_4: pwt4,pwt_5: pwt5,
      rem1:re1,rem2:re2,rem3:re3,rem4:re4,rem5: re5,
      remarks1:rms1,remarks2:rms2,remarks3: rms3,remarks4: rms4,remarks5:rms5,
      photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addSteelUnitWtTest`,
      JSON.stringify(parameters)
    );
  }


  addWaterAbsTest(workid: any,empid: any,date: any,stagework: any,
    wt1: any,wt2: any,wt3: any,
    cwt1: any,cwt2: any,cwt3: any,
    pwt1: any,pwt2: any,pwt3: any,
    re1: any,re2: any,re3: any,
    tot: any,avg: any,remark: any,
    pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,date_of_testing: date, stage_work: stagework,
      wt_1: wt1,wt_2: wt2,wt_3: wt3,
      cwt_1: cwt1,cwt_2:cwt2,cwt_3:cwt3,
      pwt_1:pwt1,pwt_2:pwt2,pwt_3:pwt3,
      swt_1:re1,swt_2:re2,swt_3:re3,
      total: tot,average:avg,remarks:remark,
      photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addWaterAbsTest`,
      JSON.stringify(parameters)
    );
  }


  addCC_Cube_7Test(workid: any,empid: any,deptname: any,qunt: any,grades: any,stagework: any,noofsam: any,
    castdate1: any,testdate1: any,age1: any,den1,lod1: any,str1: any,avg: any,charstr1: any,
    smpl1: any,spl11: any,
    castdate2: any,testdate2: any,age2: any,den2,lod2: any,str2: any,charstr2: any,smpl2: any,spl22: any,
    castdate3: any,testdate3: any,age3: any,den3,lod3: any,str3: any,charstr3: any,smpl3: any,spl33: any,
    rems: any,cub1: any,cub2: any,cub3: any,
    pt1: any,
    pt2: any,empsign: any,contname: any,contsign: any,upjnname: any,upjnsign: any) {
    const parameters = {work_id:workid, emp_id: empid,dept_name: deptname,quantity:qunt,
      grade: grades,stage_work:stagework,samples: noofsam,
      casting_date1: castdate1,testing_date1:testdate1,cube_age1:age1,cube1:cub1,density1:den1,load1:lod1,strength1: str1,avg1: avg,char_strength1:charstr1,sample1: smpl1,sample11: spl11,
      casting_date2: castdate2,testing_date2:testdate2,cube_age2:age2,cube2:cub2,density2:den2,load2:lod2,strength2: str2,char_strength2:charstr2,sample2: smpl2,sample22: spl22,
      casting_date3: castdate3,testing_date3:testdate3,cube_age3:age3,cube3:cub3,density3:den3,load3:lod3,strength3: str3,char_strength3:charstr3,sample3: smpl3,sample33: spl33,
      observation: rems,photo1:pt1,
      photo2: pt2,emp_sign: empsign,cont_agency_name: contname,cont_agency_sign: contsign,
      upjn_name: upjnname,upjn_sign: upjnsign};
    console.log('JSON', JSON.stringify(parameters));

    return this.httpClient.post(
      `${environment.apiUrl}/addCC_Cube_7Test`,
      JSON.stringify(parameters)
    );
  }


}
