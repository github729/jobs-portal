import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  employeeSignUpForm: FormGroup;
  employerSignUpForm: FormGroup;


  constructor(private _fb: FormBuilder,
              private userApi: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeSignUpForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
    });
    // this.employerSignUpForm = this._fb.group({
    //   employerName: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required],
    //   mobileNumber: ['', Validators.required],
    // });
  }
  // convenience getter for easy access to form fields
  get f() { return this.employeeSignUpForm.controls; }


  // employerSignUp(userData) {

  // }
  employeeSignUp(userData) {
    this.userApi.registerUser(userData).subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res['success']) {
        // tslint:disable-next-line: no-string-literal
        this.toastr.success(res['message'], 'Success');
      }
    });
  }
}
