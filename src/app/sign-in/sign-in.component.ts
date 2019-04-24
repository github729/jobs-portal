import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private userApi: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.signInForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.signInForm.controls; }

  login(userData) {
    this.userApi.LoginUser(userData).subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res['success']) {
        // tslint:disable-next-line: no-string-literal
        this.toastr.success(res['message'], 'Success');
        this.router.navigate(['/job-list']);
      } else {
        this.toastr.error(res['message'], 'Failed');
      }
    });
  }
}
