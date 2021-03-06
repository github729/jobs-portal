import { Meta, Title } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";
import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { JobsService } from "../jobs.service";
import { ENV } from "../app.settings";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.css"]
})
export class JobDetailsComponent implements OnInit {
  jobId: any;
  jobDetails: any;
  currentUser: any;
  url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    @Inject(PLATFORM_ID) private platformId: any,
    private jobsApi: JobsService
  ) {
    this.url = ENV.DomainUrl + this.router.url;
    if (isPlatformBrowser(this.platformId)) {
      // localStorage will be available: we can use it.
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jobId = params.id;
      this.jobsApi.getJobById(this.jobId).subscribe(res => {
        if (res["success"]) {
          this.jobDetails = res["data"];
          this.titleService.setTitle(
            `Hiring for ${this.jobDetails.category} - ${
              this.jobDetails.city
            }- ${this.jobDetails.state} - ${this.jobDetails.companyName} - ${
              this.jobDetails.experience
            }  of experience`
          );
          this.meta.updateTag({
            name: "description",
            content: `Job Description for Hiring for ${
              this.jobDetails.category
            } in ${this.jobDetails.companyName} in ${this.jobDetails.city}, ${
              this.jobDetails.state
            } for  ${this.jobDetails.experience} of experience. Apply Now!`
          });
          this.meta.updateTag({
            name: "keywords",
            content: `${this.jobDetails.category} Jobs in ${
              this.jobDetails.city
            },${this.jobDetails.category} Jobs in ${
              this.jobDetails.companyName
            },${this.jobDetails.category} ,${this.jobDetails.companyName}, ${
              this.jobDetails.city
            }, ${ENV.GlobalKeywords} `
          });
        }
      });
    });
  }
}
