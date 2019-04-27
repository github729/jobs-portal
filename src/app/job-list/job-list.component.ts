import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any;
  locations: any;
  categories: any;
  companies: any;
  filterData: any = {}
  p: number = 1;
  totalRecords: any;
  limit : number = 10;

  constructor(private jobApi: JobsService) { }

  ngOnInit() {
    this.filterData.limit = this.limit;
    this.filterData.offset = 0;
    this.getJobs(this.filterData);
    this.jobApi.getJobFilters().subscribe(res => {
      if (res['success']) {
        this.locations = res['locations'];
        this.categories = res['categories'];
        this.companies = res['companies'];
      }
    })
  }
  getJobs(filterData?) {
    this.jobApi.getJobs(filterData).subscribe(res => {
      if (res['success']) {
        this.jobs = res['data'];
        this.totalRecords = res['recordsTotal'];
      }
    });
  }
  filterJobs(searchData) {
    if (searchData != undefined) {
      searchData.limit = this.limit;
      searchData.offset = 0;
    }
    this.getJobs(searchData);
  }
  pageChanged(page) {
    const data: any = {};
    this.p = page;
    data.offset = (page - 1) * this.limit ;
    data.limit = this.limit;
    this.getJobs(data);
  }
}
