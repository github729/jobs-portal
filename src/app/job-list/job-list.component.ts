import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit,AfterViewInit{
  jobs: any;
  locations: any;
  categories: any;
  companies: any;
  filterData: any = {}
  p: number = 1;
  totalRecords: any;
  limit: number = 2;
  selectedCompanies: any = [];
  selectedLocations: any = [];
  selectedExp: any = [];
  selectedJobType: any = [];

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
  ngAfterViewInit() {
    try {
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    } catch (e) {
      console.error("error");
    }

  }
  allCategories() {
    const filterData: any = {}
    filterData.limit = this.limit;
    filterData.offset = 0;
    this.getJobs(filterData);
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
    data.offset = (page - 1) * this.limit;
    data.limit = this.limit;
    this.getJobs(data);
  }
  selectCompany(type, data) {
    if (type.target.checked) {
      this.selectedCompanies.push(data.companyName);
    } else {
      var index = this.selectedCompanies.indexOf(data.companyName);
      if (index > -1) {
        this.selectedCompanies.splice(index, 1);
      }
    }
    this.filterData.selectedCompanies = this.selectedCompanies;
    this.getJobs(this.filterData);
  }
  selectLocation(type, data) {
    if (type.target.checked) {
      this.selectedLocations.push(data.state);
    } else {
      var index = this.selectedLocations.indexOf(data.state);
      if (index > -1) {
        this.selectedLocations.splice(index, 1);
      }
    }
    this.filterData.selectedLocations = this.selectedLocations;
    this.getJobs(this.filterData);

  }
  selectExp(type, data) {
    if (type.target.checked) {
      this.selectedExp.push(data);
    } else {
      var index = this.selectedExp.indexOf(data);
      if (index > -1) {
        this.selectedExp.splice(index, 1);
      }
    }
    this.filterData.selectedExp = this.selectedExp;
    this.getJobs(this.filterData);

  }
  selectJobType(type, data) {
    if (type.target.checked) {
      this.selectedJobType.push(data);
    } else {
      var index = this.selectedJobType.indexOf(data);
      if (index > -1) {
        this.selectedJobType.splice(index, 1);
      }
    }
    this.filterData.selectedJobType = this.selectedJobType;
    this.getJobs(this.filterData);
  }
  selectCategory(data) {
    this.filterData.category = data.category;
    this.getJobs(this.filterData);
  }
}
