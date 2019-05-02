import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

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
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeSignUpForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      city: [''],
      role: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.employeeSignUpForm.controls; }

  employeeSignUp(userData) {
    this.userApi.registerUser(userData).subscribe(res => {
      if (res['success']) {
        this.toastr.success(res['message'], 'Success');
        this.router.navigate(['/sign-in'])
      }
    });
  }
}
