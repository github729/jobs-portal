import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
              private jobsApi: JobsService) { }

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
