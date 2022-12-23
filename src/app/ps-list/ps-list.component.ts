import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-ps-list',
  templateUrl: './ps-list.component.html',
  styleUrls: ['./ps-list.component.scss']
})
export class PsListComponent implements OnInit {
  public psList = [];
  public pageSize: number = 20;
  public paseSizes: number[] = [5, 10, 15, 20];
  public lowerBound = 1;
  public upperBound = 20;
  public posts = [];
  // public url=http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj={"userId":1,"lowerBound":21,"upperBound":40,}
  constructor(public http: HttpClient) { }
  ngOnInit() {
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


}
