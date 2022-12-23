import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ps-list',
  templateUrl: './ps-list.component.html',
  styleUrls: ['./ps-list.component.scss']
})
export class PsListComponent implements OnInit {
  modalRef?: BsModalRef;
  public psList = [];
  public lookUpsData:any = [];
  public pageSize: number = 20;
  public paseSizes: number[] = [5, 10, 15, 20];
  public lowerBound = 1;
  public upperBound = 20;
  public posts = [];
  //form defiened here
  personForm = new FormGroup({
    psId:new FormControl(0),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required]),
    salutation: new FormControl('', [Validators.required]),
    maritialStatus: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    ssn: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    language: new FormControl(null, [Validators.required]),
    addressType: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    addressLine2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneType:new FormControl('',[Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    timeZone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })
  //data obj defiened here
  public data = {
    "psId": 0,
    "saluationId": "DR",
    "genderId": "U",
    "lastName": "1-louisville",
    "firstName": " l",
    "raceId": "O",
    "maritalStatusID": "U",
    "dob": "01/01/1998",
    "ssn": "",
    "languageId": 1,
    "locationId": "Home111",
    "city": "Antioch",
    "addressLine": "5-10/1/1/10/N/P",
    "addressLine2": "",
    "zipcode": "37011",
    "phoneTypeid": "Home",
    "phone": "7896325410",
    "stateId": 43,
    "countyId": 751,
    "timeZoneId": 1,
    "countryId": "USA",
    "officeId": 140,
    "mappedOfficeIds": "140",
    "updatedUserId": 1
  }
  // public url=http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj={"userId":1,"lowerBound":21,"upperBound":40,}
  constructor(public http: HttpClient,private modalService: BsModalService, public datePipe: DatePipe) { }
  ngOnInit() {
    this.getLookupData()
    this.getPSList()
  }
  ngOnChanges() {
    this.setPageSize()
  }
  /**
   * getPSList is used to fetch data for psList table
   */
  public getPSList() {
    let object = {
      userId: 1,
      lowerBound: this.lowerBound,
      upperBound: this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj=' + JSON.stringify(object)).subscribe(
      (response: any) => { this.psList = response.psList; console.log(this.psList) },
      (error) => { console.log(error); });
  }
  /**
   * onPrevieous and next are used for paginantion
   */
  onPrevious() {
    console.log(this.pageSize)
    this.lowerBound = this.lowerBound - Number(this.pageSize)
    this.upperBound = this.upperBound - Number(this.pageSize)
    console.log(this.lowerBound);
    console.log(this.upperBound);
    let object={
      userId: 1,
      lowerBound:this.lowerBound,
      upperBound:this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj='+JSON.stringify(object)).subscribe(
    (response:any) => { this.psList = response.psList ; console.log(this.psList)},
    (error) => { console.log(error);
    });
  }

  onNext() {
    console.log(this.pageSize)
    this.lowerBound = this.lowerBound + Number(this.pageSize)
    this.upperBound = this.upperBound + Number(this.pageSize);
    console.log(this.lowerBound);
    console.log(this.upperBound);
    let object={
      userId: 1,
      lowerBound:this.lowerBound,
      upperBound:this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj='+JSON.stringify(object)).subscribe(
    (response:any) => { this.psList = response.psList ; console.log(this.psList)},
    (error) => { console.log(error);
    });
  }
  setPageSize() {
    console.log(this.pageSize);
    this.lowerBound=1;
    this.upperBound = Number(this.pageSize);
    console.log(this.lowerBound);
    console.log(this.upperBound);
    let object={
      userId: 1,
      lowerBound:this.lowerBound,
      upperBound:this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj='+JSON.stringify(object)).subscribe(
    (response:any) => { this.psList = response.psList ; console.log(this.psList)},
    (error) => { console.log(error);
    });
  }
/**
   *opening modal forms
*/
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
/**
   *submitting form
*/
public submitted:boolean=false;
  onSubmit() {
    this.submitted = true;
    if(this.personForm.invalid){
      alert("invalid data");
     }
     else{
      console.log(this.personForm.value.dateOfBirth)
      console.log(this.personForm.getRawValue());
      this.data.saluationId=this.personForm.value.salutation;
      this.data.firstName=this.personForm.value.firstName;
      this.data.lastName=this.personForm.value.lastName;
      console.log(this.personForm.value.dateOfBirth)
      this.data.dob=this.datePipe.transform(this.personForm.value.dateOfBirth, 'MM/dd/yyyy');
      console.log(this.data.dob)
      this.http.post('http://poc.aquilasoftware.com/poclite/psapi/savePSDetails',JSON.stringify(this.data)).subscribe(result=>{
      console.log(result);
      this.personForm.reset();
      this.submitted = false;
    })
     }
   }
  //  ''
   /**
    * getting lookup data for form
    */
   public getLookupData() {
    this.http.get('http://poc.aquilasoftware.com/poclite/common/getLookupsData?lookupNames=gender,salutation,race,maritial_status,address_type,phone_type,language').subscribe(result => {
      this.lookUpsData = result;
      console.log(result);
    })
   }
  /**
   * modal for edit option
   */
   public i:number;
  public names=[]
  public adress=[]
  public  openModal(template2: TemplateRef<any>,index:number) {
    const name =this.psList[index].PSName;
    const sname =this.psList[index].siteName;
    this.adress=sname.split("-")
    this.i=index
    console.log(this.adress)
    console.log(this.psList[index])
    this.names=name.split(",")
    console.log(this.names)
    this.personForm.get('lastName').setValue(this.names[0])
    this.personForm.get('firstName').patchValue(this.names[1])
    this.personForm.get('city').patchValue(this.psList[index].city)
    this.personForm.get('phone').patchValue(this.psList[index].phone)
    this.personForm.get('state').patchValue(this.psList[index].state)
    this.personForm.get('zipCode').patchValue(this.psList[index].zipCode)
    this.personForm.get('addressLine1').patchValue(this.adress[0])
    this.personForm.get('addressLine2').patchValue(this.adress[1])
    this.modalRef = this.modalService.show(template2);
  }
  /**
   * editSubmit

   */
  public editSubmit() {
    if(this.personForm.invalid){
      alert("invalid data");
     }else{
    this.data.psId=this.psList[this.i].PSId
    this.data.firstName=this.personForm.value.firstName
    this.data.lastName=this.personForm.value.lastName
    this.data.city=this.personForm.value.city
    this.data.phone=this.personForm.value.phone
    this.data.zipcode=this.personForm.value.zipCode
    this.data.addressLine=this.personForm.value.addressLine1
    this.data.addressLine2=this.personForm.value.addressLine2
    this.http.post('http://poc.aquilasoftware.com/poclite/psapi/savePSDetails',JSON.stringify(this.data)).subscribe(result=>{
      console.log(result);
      this.personForm.reset();
      this.submitted = false;
    })
  }
}
}
