import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css']
})
export class CloseAccountComponent implements OnInit {
  userId: any;
  currentUser: any;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private userApi: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(this.localStorage.getItem('currentUser'));
  }
  deleteClose() {
    this.userApi.deleteUser(this.currentUser.user.id).subscribe(res => {
      if (res['success']) {
        this.toastr.success(res['message'], 'Success');
        this.userApi.logout();
        this.currentUser = JSON.parse(this.localStorage.getItem('currentUser'));
        this.router.navigate(['/home']);
      }
    });
  }
}
