import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ContentComponent } from '../content/content.component';
import { DataService } from '../service/data.service';
import { Subject, Subscription } from 'rxjs';
import { PrimeNGConfig, OverlayOptions } from 'primeng/api';

@Component({
  selector: 'app-ps-list',
  templateUrl: './ps-list.component.html',
  styleUrls: ['./ps-list.component.scss']
})
export class PsListComponent implements OnInit {
  public
  modalRef?: BsModalRef;
  public psList = [];
  public lookUpsData: any = [];
  public pageSize: number = 10;
  public paseSizes: number[] = [5, 10, 15, 20];
  public lowerBound = 1;
  public upperBound = 10;
  public posts = [];
  public searchText;
  //form defiened here
  personForm = new FormGroup({
    psId: new FormControl(0),
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
    phoneType: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
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
  subscription: Subscription;
  // public url=http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj={"userId":1,"lowerBound":21,"upperBound":40,}
  constructor(private primengConfig: PrimeNGConfig, public http: HttpClient, private modalService: BsModalService, public datePipe: DatePipe, public dataService: DataService) { }
  ngOnInit() {
    this.dataService.getLookupData()
    this.getPSList();
    this.subscription=this.dataService.updateTable$.subscribe(
      (result) => {
        console.log(result)
        this.getPSList();
        // this.postData = result;
        // this.postEditData()
      })
      this.primengConfig.overlayOptions = {
        appendTo: 'body'
    };
  }
  ngOnChanges() {
    this.setPageSize()
    this.getPSList();
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
    let object = {
      userId: 1,
      lowerBound: this.lowerBound,
      upperBound: this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj=' + JSON.stringify(object)).subscribe(
      (response: any) => { this.psList = response.psList; console.log(this.psList) },
      (error) => {
        console.log(error);
      });
  }

  onNext() {
    console.log(this.pageSize)
    this.lowerBound = this.lowerBound + Number(this.pageSize)
    this.upperBound = this.upperBound + Number(this.pageSize);
    console.log(this.lowerBound);
    console.log(this.upperBound);
    let object = {
      userId: 1,
      lowerBound: this.lowerBound,
      upperBound: this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj=' + JSON.stringify(object)).subscribe(
      (response: any) => { this.psList = response.psList; console.log(this.psList) },
      (error) => {
        console.log(error);
      });
  }
  setPageSize() {
    console.log(this.pageSize);
    this.lowerBound = 1;
    this.upperBound = Number(this.pageSize);
    console.log(this.lowerBound);
    console.log(this.upperBound);
    let object = {
      userId: 1,
      lowerBound: this.lowerBound,
      upperBound: this.upperBound,
    }
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj=' + JSON.stringify(object)).subscribe(
      (response: any) => { this.psList = response.psList; console.log(this.psList) },
      (error) => {
        console.log(error);
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
  public submitted: boolean = false;
  onSubmit() {
    this.submitted = true;
    if (this.personForm.invalid) {
      alert("invalid data");
    }
    else {
      console.log(this.personForm.value.dateOfBirth)
      console.log(this.personForm.getRawValue());
      this.data.saluationId = this.personForm.value.salutation;
      this.data.firstName = this.personForm.value.firstName;
      this.data.lastName = this.personForm.value.lastName;
      console.log(this.personForm.value.dateOfBirth)
      this.data.dob = this.datePipe.transform(this.personForm.value.dateOfBirth, 'MM/dd/yyyy');
      console.log(this.data.dob)
      this.http.post('http://poc.aquilasoftware.com/poclite/psapi/savePSDetails', JSON.stringify(this.data)).subscribe(result => {
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

  public i: number;
  public names = []
  public adress = []
  /**
   * modal for edit option
   */
  public postData: any;
  public openModal(data) {
    console.log(data);
    this.modalRef = this.modalService.show(ContentComponent, {
      initialState: {
        submitted: false,
        PSId: data.PSId
      }
    });

  }
  /**
   * postEditData
   */
  public postEditData() {
    this.http.post('http://poc.aquilasoftware.com/poclite/psapi/savePSDetails', JSON.stringify(this.postData)).subscribe(
      result => {
      console.log("sucess")
      console.log(this.postData)
    })

  }
  ngOnDestroy() {
    console.log("in destroy")
    this.subscription.unsubscribe();
 }
 /**
  * overlay starts here
  */
 overlayVisible: boolean = false;

 toggle() {
     this.overlayVisible = !this.overlayVisible;
 }

}
