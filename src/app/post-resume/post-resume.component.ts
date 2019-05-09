import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-post-resume',
  templateUrl: './post-resume.component.html',
  styleUrls: ['./post-resume.component.css']
})
export class PostResumeComponent implements OnInit {
  resumeForm: FormGroup;
  ckeConfig: { height: number; allowedContent: boolean; fullPage: boolean; toolbar: { name: string; items: string[]; }[]; };
  currentUser: any;



  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private _fb: FormBuilder,
    private jobsApi: JobsService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
  }

  ngOnInit() {
    this.resumeForm = this._fb.group({
      // basicInfo: this._fb.group({
      fullName: ['', Validators.required],
      addInfo: ['', Validators.required],
      // image: ['', Validators.required],
      // }),
      careerObjective: ['', Validators.required],
      workHistory: this._fb.array([this.initWorkHistory()]),
      educationDetails: this._fb.array([this.initEducationDetails()]),
      specialQualification: ['', Validators.required],
      languageProficiency: this._fb.array([this.initLanguages()]),
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      // personalDetails: this.initPersonalDetails(),
      declaration: ['', Validators.required]
    });
  }

  // Initialize the Work History
  initWorkHistory() {
    return this._fb.group({
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      joiningDate: ['', Validators.required],
      relievingDate: ['', Validators.required],
      jobDescription: ['', Validators.required]
    });
  }

  // Initialize the Education Details
  initEducationDetails() {
    return this._fb.group({
      instituteName: ['', Validators.required],
      qualification: ['', Validators.required],
      result: ['', Validators.required],
      startingDate: ['', Validators.required],
      endingDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Initialize the Language
  initLanguages() {
    return this._fb.group({
      name: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  // Initialize the Personal Details
  initPersonalDetails() {
    return this._fb.group({
      // fullName: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // For Adding New Language
  addLanguage() {
    const control = this.resumeForm.controls.languageProficiency as FormArray;
    control.push(this.initLanguages());
  }
  // For Removing New Language
  removeLanguage(i: number) {
    const control = this.resumeForm.controls.languageProficiency as FormArray;
    control.removeAt(i);
  }

  // For Adding New Education Qualification
  addEducation() {
    const control = this.resumeForm.controls.educationDetails as FormArray;
    control.push(this.initEducationDetails());
  }
  // For Removing New Education Qualification
  removeEducation(i: number) {
    const control = this.resumeForm.controls.educationDetails as FormArray;
    control.removeAt(i);
  }

  // For Adding New Work History
  addWorkHistory() {
    const control = this.resumeForm.controls.workHistory as FormArray;
    control.push(this.initWorkHistory());
  }
  // For Removing New Work History
  removeWorkHistory(i: number) {
    const control = this.resumeForm.controls.workHistory as FormArray;
    control.removeAt(i);
  }

  // convenience getter for easy access to form fields
  get f() { return this.resumeForm.controls; }


  postResume() {
    this.resumeForm.value.userId = this.currentUser.user.id;
    this.jobsApi.postResume(this.resumeForm.value).subscribe(res => {
    });
  }
}
