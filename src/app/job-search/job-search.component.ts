import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JobsService } from '../jobs.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  locations: any;
  categories: any;
  jobSearch: FormGroup;
  jobs: any;
  @Output() filterJobs = new EventEmitter<void>();

  constructor(private jobApi: JobsService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.jobSearch = this._fb.group({
      category: [''],
      state: [''],
      keywords: ['']
    });
    this.jobApi.getJobFilters().subscribe(res => {
      if (res['success']) {
        this.locations = res['locations'];
        this.categories = res['categories'];
      }
    });
  }
  search() {
    this.filterJobs.emit(this.jobSearch.value);
  }
}
