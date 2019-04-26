import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {
  resumeDetails: any;

  constructor(private jobsApi: JobsService) { }

  ngOnInit() {
    this.jobsApi.getResume(1).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.resumeDetails = res['data'];
      }
    });
  }

}
