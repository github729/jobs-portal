import { Component, OnInit, Inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

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

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private jobsApi: JobsService) {
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
