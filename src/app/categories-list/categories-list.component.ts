import { Meta } from "@angular/platform-browser";
import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { JobsService } from "../jobs.service";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"]
})
export class CategoriesListComponent implements OnInit {
  categories: any;

  constructor(
    private jobApi: JobsService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.meta.updateTag({
      name: "description",
      content:
        "Browse Jobs by Functional Area/Industry/Category on Quikresults.in. Register Free to apply online for Job Vacancies in your desired sector"
    });
    this.titleService.setTitle(
      "Browse Jobs by Functional Area/Industry/Category - Quikresults.in"
    );
  }

  ngOnInit() {
    this.jobApi.getJobsCategories().subscribe(res => {
      this.categories = res["data"];
    });
  }
}
