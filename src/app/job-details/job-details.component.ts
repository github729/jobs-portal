import { isPlatformBrowser } from '@angular/common';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobId: any;
  jobDetails: any;
  currentUser: any;

  constructor(private route: ActivatedRoute,
    @Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any,
    private jobsApi: JobsService) {
      if (isPlatformBrowser(this.platformId)) {
        // localStorage will be available: we can use it.
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jobId = params.id;
      this.jobsApi.getJobById(this.jobId).subscribe(res => {
        if (res['success']) {
          this.jobDetails = res['data'];
        }
      });
    });
  }

}
