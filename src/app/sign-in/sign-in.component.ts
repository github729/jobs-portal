import { Meta } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  submitted = false;
  constructor(
    private _fb: FormBuilder,
    private userApi: UserService,
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {
    this.meta.updateTag({
      name: "description",
      content:
        "Login to Quikresults.in. Find jobs in India, Search & Apply to Jobs in India, Delhi, Mumbai, Bangalore. Jobs in IT, Sales, Manufacturing, Marketing, Finance."
    });
    this.titleService.setTitle(
      "Login Quikresults.in | Search the Best Jobs available in India"
    );
  }

  ngOnInit() {
    this.signInForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.signInForm.controls;
  }

  login(userData) {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }

    this.userApi.LoginUser(userData).subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res["success"]) {
        // tslint:disable-next-line: no-string-literal
        HeaderComponent.updateUserStatus.next(true); // here!
        this.toastr.success("You are Logged in Successfully", "Success");
        this.router.navigate(["/job-list"]);
      } else {
        this.toastr.error(res["message"], "Failed");
      }
    });
  }
}
