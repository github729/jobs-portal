import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  jobForm: FormGroup;
  ckeConfig: any;
  states: any;
  cities: any;

  constructor(private _fb: FormBuilder,
    private jobsApi: JobsService,
    private router: Router) { }


  ngOnInit() {
    // Getting states
    this.jobsApi.getStates().subscribe(res => {
      if (res['success']) {
        this.states = res['data'];
      }
    });
    // Configure editor
    this.ckeConfig = {
      height: 100,
      allowedContent: false,
      fullPage: true,
      toolbar: [
        { name: "basicstyles", items: ["Bold", "Italic", "Underline", "RemoveFormat"] },
        { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
        { name: "paragraph", items: ["NumberedList", "BulletedList"] },
        { name: "links", items: ["Link", "Unlink"] },
      ]
    };
    this.jobForm = this._fb.group({
      category: ['',Validators.required],
      jobType: ['', Validators.required],
      title: ['', Validators.required],
      applyUrl: ['', Validators.required],
      requirements: ['', [Validators.required, Validators.maxLength(5000)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      minSalary: [''],
      maxSalary: [''],
      salaryType: [''],
      experience: ['', Validators.required],
      function: ['', Validators.required],
      jobDeadLine: [''],
      industry: [''],
      companyName: ['', Validators.required],
      companySize: [''],
      companySite: ['', Validators.required],
      email: [''],
      mobileNumber: [''],
      address: [''],
      terms: ['']
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.jobForm.controls; }

  postJob() {
    this.jobsApi.postJob(this.jobForm.value).subscribe(res => {
      if (res['success']) {
        this.router.navigate(['/job-list'])
      } else {

      }
    })
  }
  onChange(data) {
    this.states.map(state => {
      if (state.name === data) {
        this.jobsApi.getCityBySateId(state.id).subscribe(res => {
          if (res['success']) {
            this.cities = res['data'];
          }
        })
      }
    })
  }
}
