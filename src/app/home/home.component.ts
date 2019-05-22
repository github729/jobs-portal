import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { JobsService } from "../jobs.service";
import { WINDOW } from "@ng-toolkit/universal";
import { Meta, Title } from "@angular/platform-browser";
import { SlugifyPipe } from '../slugify.pipe';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  title =
    "Jobs 2019 - Search Jobs in India, Latest Job Vacancies, Recruitment,IT Jobs,Software Jobs,Development Jobs - Quikresults.in";
  locations: any;
  categories: any;
  jobSearch: FormGroup;
  jobs: any;

  constructor(
    @Inject(WINDOW) private window: Window,
    private jobApi: JobsService,
    private _fb: FormBuilder,
    private titleService: Title,
    private router: Router,
    private meta: Meta,
    private sulgify: SlugifyPipe
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.jobSearch = this._fb.group({
      category: [""],
      city: [""],
      keywords: [""]
    });
    this.jobApi.getJobFilters().subscribe(res => {
      if (res["success"]) {
        this.locations = res["locations"];
        this.categories = res["categories"];
      }
    });
    this.jobApi.topFiveJobs().subscribe(res => {
      if (res["success"]) {
        this.jobs = res["data"];
      }
    });
  }
  ngAfterViewInit() {
    // try {
    //   (this.window['adsbygoogle'] = this.window['adsbygoogle'] || []).push({});
    // } catch (e) {
    // }
  }
  search() {
    this.router.navigate(["/job-list"], {
      queryParams: {
        category: `${this.jobSearch.value.category}`,
        city: `${this.jobSearch.value.city}`,
        keyWords: `${this.jobSearch.value.keywords}`
      },
      queryParamsHandling: "merge"
    });
  }
  jobDetailView(job) {
    this.router.navigate([
      "/job-details",
      this.sulgify.transform(job.category),
      this.sulgify.transform(job.companyName),
      this.sulgify.transform(job.state),
      this.sulgify.transform(job.city),
      btoa(job.id)
    ]);
  }
}
