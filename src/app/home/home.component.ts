import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {

  locations: any;
  categories: any;
  jobSearch: FormGroup;
  jobs: any;

  constructor(private jobApi: JobsService,
    private _fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.jobSearch = this._fb.group({
      category: [''],
      city: [''],
      keywords: ['']
    });
    this.jobApi.getJobFilters().subscribe(res => {
      if (res['success']) {
        this.locations = res['locations'];
        this.categories = res['categories'];
      }
    });
    this.jobApi.topFiveJobs().subscribe(res => {
      if (res['success']) {
        this.jobs = res['data'];
        console.log(this.jobs);
      }
    });
  }
  ngAfterViewInit() {
    try{
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    }catch(e){
      console.error("error");
    }
  }
  search() {
    this.router.navigate(['/job-list'],
      {
        queryParams: {
          category: `${this.jobSearch.value.category}`,
          city: `${this.jobSearch.value.city}`, keyWords: `${this.jobSearch.value.keywords}`
        },
        queryParamsHandling: 'merge'
      });
  }
}
