import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any;

  constructor(private jobApi: JobsService) { }

  ngOnInit() {
    this.jobApi.getJobs().subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res['success']) {
        // tslint:disable-next-line: no-string-literal
        this.jobs = res['jobs'];
      } else {

      }
    })
  }

}
