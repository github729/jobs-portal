import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {
  resumeDetails: any;
  currentUser: any;
  message: any;
  loader: boolean = true;

  constructor(private jobsApi: JobsService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.jobsApi.getResume(this.currentUser.user.id).subscribe(res => {
      if (res['success']) {
        this.resumeDetails = res['data'];
        this.loader = false;
      }
      else {
        this.message = res['message'];
        this.loader = false;
      }
    });
  }

}
