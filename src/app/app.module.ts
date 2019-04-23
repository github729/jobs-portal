import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostJobComponent } from './post-job/post-job.component';
import { PostResumeComponent } from './post-resume/post-resume.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ResumeEditComponent } from './resume-edit/resume-edit.component';
import { CloseAccountComponent } from './close-account/close-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    JobListComponent,
    JobDetailsComponent,
    SignInComponent,
    SignUpComponent,
    PostJobComponent,
    PostResumeComponent,
    ResumeDetailsComponent,
    AppliedJobsComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    ResumeEditComponent,
    CloseAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
