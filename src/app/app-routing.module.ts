import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { JobListComponent } from "./job-list/job-list.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { PostJobComponent } from "./post-job/post-job.component";
import { PostResumeComponent } from "./post-resume/post-resume.component";
import { ResumeDetailsComponent } from "./resume-details/resume-details.component";
import { AppliedJobsComponent } from "./applied-jobs/applied-jobs.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { ResumeEditComponent } from "./resume-edit/resume-edit.component";
import { CloseAccountComponent } from "./close-account/close-account.component";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "job-list", component: JobListComponent },
  {
    path: "job-details/:category/:companyName/:state/:city/:id",
    component: JobDetailsComponent
  },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "post-job", component: PostJobComponent },
  { path: "post-resume", component: PostResumeComponent },
  { path: "resume-details", component: ResumeDetailsComponent },
  { path: "applied-jobs", component: AppliedJobsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile-update", component: ProfileUpdateComponent },
  { path: "resume-edit", component: ResumeEditComponent },
  { path: "delete-account", component: CloseAccountComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "disclaimer", component: DisclaimerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
