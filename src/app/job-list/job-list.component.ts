import { Meta, Title } from "@angular/platform-browser";
import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { JobsService } from "../jobs.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";
import { isPlatformBrowser, Location } from "@angular/common";
import { SlugifyPipe } from "../slugify.pipe";
declare interface Window {
  adsbygoogle: any[];
}

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.css"]
})
export class JobListComponent implements OnInit {
  jobs: any;
  locations: any;
  categories: any;
  companies: any;
  filterData: any = {};
  p: number = 1;
  totalRecords: any;
  limit: number = 10;
  selectedCompanies: any = [];
  selectedLocations: any = [];
  selectedExp: any = [];
  selectedJobType: any = [];
  currentUser: any;
  jobSearch: FormGroup;
  selectedItem: any;
  query: boolean;
  topFiveLocations: any;
  topFiveCompanies: any;
  topFiveCategories: any;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private jobApi: JobsService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private titleService: Title,
    private router: Router,
    private meta: Meta,
    private sulgify: SlugifyPipe
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage will be available: we can use it.
      this.currentUser = JSON.parse(this.localStorage.getItem("currentUser"));
    }
    this.meta.updateTag({
      name: "description",
      content:
        "Connect with employers. Apply to Millions of job opportunities across top companies, industries & locations on India’s job site. Apply online. Post CV today."
    });
    this.titleService.setTitle(
      "Jobs 2019 - Recruitment - Job Search - Employment - Job Vacancies - Quikresults.in"
    );
  }

  ngOnInit() {
    this.filterData.limit = this.limit;
    this.filterData.offset = 0;
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        if (params.companyName != undefined) {
          this.jobSearch = this._fb.group({
            category: [""],
            city: [""],
            keywords: [""]
          });
          this.filterData.companyName = params.companyName;
          this.query = true;
          this.filterJobs(this.filterData);
        } else {
          this.jobSearch = this._fb.group({
            category: [params.category !== undefined ? params.category : ""],
            city: [params.city !== undefined ? params.city : ""],
            keywords: [params.keyWords]
          });
          this.filterData = this.jobSearch.value;
          this.query = true;
          this.filterJobs(this.jobSearch.value);
        }
      } else {
        this.jobSearch = this._fb.group({
          category: [""],
          city: [""],
          keywords: [""]
        });
        this.filterData = this.jobSearch.value;
        this.getJobs(this.filterData);
      }
    });
    this.jobApi.getJobFilters().subscribe(res => {
      if (res["success"]) {
        this.locations = res["locations"];
        this.categories = res["categories"];
        this.companies = res["companies"];
      }
    });
    this.jobApi.getTopFiveJobFilters().subscribe(res => {
      if (res["success"]) {
        this.topFiveLocations = res["locations"];
        this.topFiveCategories = res["categories"];
        this.topFiveCompanies = res["companies"];
      }
    });
  }

  allCategories() {
    delete this.filterData.category;
    this.filterData.limit = this.limit;
    this.filterData.offset = 0;
    this.getJobs(this.filterData);
  }
  getJobs(filterData?) {
    this.jobApi.getJobs(filterData).subscribe(res => {
      if (res["success"]) {
        this.jobs = res["data"];
        this.totalRecords = res["recordsTotal"];
      }
    });
  }
  filterJobs(searchData) {
    if (!this.query) {
      this.location.replaceState(this.location.path().split("?")[0], "");
    }
    if (searchData != undefined) {
      searchData.limit = this.limit;
      searchData.offset = 0;
      this.query = false;
    }
    this.getJobs(searchData);
  }
  pageChanged(page) {
    this.p = page;
    this.filterData.offset = (page - 1) * this.limit;
    this.filterData.limit = this.limit;
    this.getJobs(this.filterData);
  }
  selectCompany(type, data) {
    if (type.target.checked) {
      this.selectedCompanies.push(data.companyName);
    } else {
      var index = this.selectedCompanies.indexOf(data.companyName);
      if (index > -1) {
        this.selectedCompanies.splice(index, 1);
      }
    }
    this.filterData.selectedCompanies = this.selectedCompanies;
    this.getJobs(this.filterData);
  }
  selectLocation(type, data) {
    if (type.target.checked) {
      this.selectedLocations.push(data.city);
    } else {
      var index = this.selectedLocations.indexOf(data.city);
      if (index > -1) {
        this.selectedLocations.splice(index, 1);
      }
    }
    this.filterData.selectedLocations = this.selectedLocations;
    this.getJobs(this.filterData);
  }
  selectExp(type, data) {
    if (type.target.checked) {
      this.selectedExp.push(data);
    } else {
      var index = this.selectedExp.indexOf(data);
      if (index > -1) {
        this.selectedExp.splice(index, 1);
      }
    }
    this.filterData.selectedExp = this.selectedExp;
    this.getJobs(this.filterData);
  }
  selectJobType(type, data) {
    if (type.target.checked) {
      this.selectedJobType.push(data);
    } else {
      var index = this.selectedJobType.indexOf(data);
      if (index > -1) {
        this.selectedJobType.splice(index, 1);
      }
    }
    this.filterData.selectedJobType = this.selectedJobType;
    this.getJobs(this.filterData);
  }
  selectCategory(data, index) {
    this.filterData.category = data.category;
    this.selectedItem = index;
    this.getJobs(this.filterData);
  }
  jobDetailView(job) {
    this.router.navigate([
      "/job-details",
      this.sulgify.transform(job.category),
      this.sulgify.transform(job.companyName),
      this.sulgify.transform(job.state),
      this.sulgify.transform(job.city),
      job.id
    ]);
  }
}
