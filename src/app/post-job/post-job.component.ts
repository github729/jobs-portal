import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  jobForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.jobForm = this._fb.group({
      category: [''],
      type: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      salary: ['', Validators.required],
      salaryType: ['', Validators.required],
      experience: ['', Validators.required],
      function: ['', Validators.required],
      industry: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
      terms: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.jobForm.controls; }

  postJob() {
    console.log(this.jobForm.value);
  }
}
