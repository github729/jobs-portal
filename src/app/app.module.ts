import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
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
import { CKEditorModule } from "ng2-ckeditor";
import { UserInfoComponent } from "./user-info/user-info.component";
import { JobSearchComponent } from "./job-search/job-search.component";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
import { AdsenseModule } from "ng2-adsense";
import { LoaderComponent } from "./loader.component";
import { GoogleAdComponent } from "./google-ad/google-ad.component";
import { CommonModule } from "@angular/common";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { NgtUniversalModule } from "@ng-toolkit/universal";
import { ShareButtonsModule } from "@ngx-share/buttons";
import { SlugifyPipe } from "./slugify.pipe";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { SortingPipe } from './sorting.pipe';
import { GoogleTextAdsComponent } from './google-text-ads/google-text-ads.component';
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
    CloseAccountComponent,
    UserInfoComponent,
    JobSearchComponent,
    LoaderComponent,
    SlugifyPipe,
    GoogleAdComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    CompaniesListComponent,
    LocationsListComponent,
    CategoriesListComponent,
    SortingPipe,
    GoogleTextAdsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CKEditorModule,
    NgxPaginationModule,
    AppRoutingModule,
    AdsenseModule.forRoot({
      adClient: "ca-pub-8450887295815397",
      adSlot: 7948811743
    }),
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    ShareButtonsModule.withConfig({})
  ],
  providers: [SlugifyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
