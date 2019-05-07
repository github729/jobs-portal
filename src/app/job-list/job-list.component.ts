import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { window } from 'rxjs/operators';
declare interface Window {
  adsbygoogle: any[];
}
declare var adsbygoogle: any[];

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, AfterViewInit {
  jobs: any;
  locations: any;
  categories: any;
  companies: any;
  filterData: any = {}
  p: number = 1;
  totalRecords: any;
  limit: number = 5;
  selectedCompanies: any = [];
  selectedLocations: any = [];
  selectedExp: any = [];
  selectedJobType: any = [];
  currentUser: any;
  jobSearch: FormGroup;

  constructor(private jobApi: JobsService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.filterData.limit = this.limit;
    this.filterData.offset = 0;
    this.route.queryParams
      .subscribe(params => {
        if (Object.keys(params).length > 0) {
          this.jobSearch = this._fb.group({
            category: [params.category],
            city: [params.city],
            keywords: [params.keyWords]
          });
          this.filterData = this.jobSearch.value;
          this.filterJobs(this.jobSearch.value)
        } else {
          this.jobSearch = this._fb.group({
            category: [''],
            city: [''],
            keywords: ['']
          });
          this.getJobs(this.filterData);
        }
      });

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
    delete this.filterData.category
    this.filterData.limit = this.limit;
    this.filterData.offset = 0;
    this.getJobs(this.filterData);
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
    this.p = page;
    this.filterData.offset = (page - 1) * this.limit;
    this.filterData.limit = this.limit;
    this.getJobs(this.filterData);
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
  jobDetailView(jobId) {
    this.router.navigate(['/job-details', jobId]);
  }
}
