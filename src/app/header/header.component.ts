import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: any;
  // tslint:disable-next-line: member-ordering
  public static updateUserStatus: Subject<boolean> = new Subject();
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any, private router: Router,
    private toastr: ToastrService,
    private userApi: UserService) {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage will be available: we can use it.
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      HeaderComponent.updateUserStatus.subscribe(res => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      });
    }
  }

  ngOnInit() {
  }
  resume() {
    if (this.currentUser) {
      this.router.navigate(['/resume-details']);
    } else {
      this.toastr.info('Please Login', 'Info!');
    }
  }
  postJob() {
    if (this.currentUser) {
      this.router.navigate(['/post-job']);
    } else {
      this.toastr.info('Please login as recruiter to post job', 'Info!');
    }
  }
  logout() {
    this.userApi.logout();
    this.currentUser = JSON.parse(this.localStorage.getItem('currentUser'));
    this.toastr.success('You have been logged out.', 'Success');
    this.router.navigate(['/home']);
  }
}
