import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  userDetails: any;
  currentUser: any;
  profileUpdate: FormGroup

  constructor(private userApi: UserService,
    private _fb: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userApi.getUserById(this.currentUser.user.id).subscribe(res => {
      if (res['success']) {
        this.userDetails = res['data'];
        this.profileUpdate = this._fb.group({
          name: [this.userDetails.name, Validators.required],
          email: [this.userDetails.email, Validators.required],
          role: [this.userDetails.role, Validators.required],
          city: [this.userDetails.city, Validators.required],
          mobileNumber: [this.userDetails.mobileNumber, Validators.required]
        });
      }
    });
  }

}
