import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
