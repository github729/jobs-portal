import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.css"]
})
export class ProfileUpdateComponent implements OnInit {
  userDetails: any;
  currentUser: any;
  profileUpdate: FormGroup;
  changePassword: FormGroup;

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private userApi: UserService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle("My Profile - QuikResults.in");
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.changePassword = this._fb.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirm_password: ["", Validators.required]
    });
    this.userApi.getUserById(this.currentUser.user.id).subscribe(res => {
      if (res["success"]) {
        this.userDetails = res["data"];
        this.profileUpdate = this._fb.group({
          name: [this.userDetails.name, Validators.required],
          email: [this.userDetails.email, Validators.required],
          role: [this.userDetails.role, Validators.required],
          // city: [this.userDetails.city, Validators.required],
          mobileNumber: [this.userDetails.mobileNumber, Validators.required]
        });
      }
    });
  }
  updateProfile() {
    this.profileUpdate.value.userId = this.currentUser.user.id;
    this.userApi.updateUser(this.profileUpdate.value).subscribe(res => {
      if (res["success"]) {
        this.toastr.success(res["message"], "Success");
        this.router.navigate(["/profile"]);
      }
    });
  }
  passwordChange() {
    this.changePassword.value.userId = this.currentUser.user.id;
    this.userApi.changePwd(this.changePassword.value).subscribe(res => {
      if (res["success"]) {
        this.userApi.logout();
        HeaderComponent.updateUserStatus.next(true); // here!
        this.toastr.success(res["message"], "Success");
        this.router.navigate(["/home"]);
      } else {
        this.toastr.error(res["message"], "Failed");
      }
    });
  }
}
