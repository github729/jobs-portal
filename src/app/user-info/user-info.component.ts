import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  currentUser: any;
  userDetails: any;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private userApi: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userApi.getUserById(this.currentUser.user.id).subscribe(res => {
      if (res['success']) {
        this.userDetails = res['data'];
      }
    });
  }

}
