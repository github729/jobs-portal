import { Meta } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AuthService } from "angularx-social-login-vk";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from "angularx-social-login-vk";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  employeeSignUpForm: FormGroup;
  employerSignUpForm: FormGroup;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private userApi: UserService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title,
    private meta: Meta,
    private authService: AuthService
  ) {
    this.meta.updateTag({
      name: "description",
      content:
        "Register with quikresutls.in &  apply to jobs easily. Find the right Job by top employers from India. Create your Profile Now, Free!."
    });
    this.titleService.setTitle(
      "Register Free on quikresults.in | Apply to Millions of Jobs Online"
    );
  }

  ngOnInit() {
    this.employeeSignUpForm = this._fb.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        mobileNumber: ["", [Validators.required]],
        city: [""],
        role: ["", Validators.required]
        // terms: ["", Validators.required]
      },
      { validator: this.checkPasswords }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.employeeSignUpForm.controls;
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  employeeSignUp(userData) {
    this.submitted = true;
    if (this.employeeSignUpForm.invalid) {
      return;
    }

    this.userApi.registerUser(userData).subscribe(res => {
      if (res["success"]) {
        this.toastr.success(res["message"], "Success");
        this.router.navigate(["/sign-in"]);
      }
    });
  }
  signInWithGoogle(): void {
    console.log("userData:");
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {})
      .catch(err => {
        console.log(err);
      });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }
}
