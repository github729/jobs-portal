import { Component, OnInit, Inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  resumeDetails: any;
  currentUser: any;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private jobsApi: JobsService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.jobsApi.getResume(this.currentUser.user.id).subscribe(res => {
      if (res['success']) {
        this.resumeDetails = res['data'];
      }
    });
  }

}
