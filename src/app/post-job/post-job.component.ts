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

  constructor(private _fb: FormBuilder,
    private jobsApi: JobsService,
    private router: Router) { }


  ngOnInit() {
    this.ckeConfig = {
      height:100,
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
      category: [''],
      jobType: ['', Validators.required],
      title: ['', Validators.required],
      applyUrl: ['', Validators.required],
      requirements: ['', [Validators.required, Validators.maxLength(5000)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      minSalary: ['', Validators.required],
      maxSalary: ['', Validators.required],
      salaryType: ['', Validators.required],
      experience: ['', Validators.required],
      function: ['', Validators.required],
      jobDeadLine: ['', Validators.required],
      industry: ['', Validators.required],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      companySite: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
      terms: ['']
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.jobForm.controls; }

  postJob() {
    console.log(this.jobForm.value);
    this.jobsApi.postJob(this.jobForm.value).subscribe(res => {
      if (res['success']) {
        this.router.navigate(['/job-list'])
      } else {

      }
    })
  }
}
