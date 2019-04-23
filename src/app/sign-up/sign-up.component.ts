import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  employeeSignUpForm: FormGroup;
  employerSignUpForm: FormGroup;


  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.employeeSignUpForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.employerSignUpForm = this._fb.group({
      employerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.employeeSignUpForm.controls; }

  // convenience getter for easy access to form fields
  get ef() { return this.employerSignUpForm.controls; }

  employerSignUp(userData) {
    console.log(userData);
  }
  employeeSignUp(userData) {
    console.log(userData);
  }
}
