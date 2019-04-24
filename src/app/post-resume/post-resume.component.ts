import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-post-resume',
  templateUrl: './post-resume.component.html',
  styleUrls: ['./post-resume.component.css']
})
export class PostResumeComponent implements OnInit {
  resumeForm: FormGroup;



  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.resumeForm = this._fb.group({
      basicInfo: this._fb.group({
        fullName: ['', Validators.required],
        addInformation: ['', Validators.required],
        image: ['', Validators.required],
      }),
      careerObject: ['', Validators.required],
      workHistory: this._fb.array([this.initWorkHistory()]),
      educationDetails: this._fb.array([this.initEducationDetails()]),
      specialQualification: ['', Validators.required],
      languageProficiency: this._fb.array([this.initLanguages()]),
      personalDetails: this.initPersonalDetails(),
      declaration: ['', Validators.required]
    });
  }

  // Initialize the Work History
  initWorkHistory() {
    return this._fb.group({
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      timePeriod: ['', Validators.required],
      jobDescription: ['', Validators.required]
    });
  }

  // Initialize the Education Details
  initEducationDetails() {
    return this._fb.group({
      instituteName: ['', Validators.required],
      degree: ['', Validators.required],
      timeDuration: ['', Validators.required],
      educationDescription: ['', Validators.required]
    });
  }

  // Initialize the Language
  initLanguages() {
    return this._fb.group({
      languageName: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  // Initialize the Personal Details
  initPersonalDetails() {
    return this._fb.group({
      fullName: ['', Validators.required],
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
    console.log(this.resumeForm.value);
  }
}
