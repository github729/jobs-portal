import { Meta, Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { JobsService } from "../jobs.service";

@Component({
  selector: "app-companies-list",
  templateUrl: "./companies-list.component.html",
  styleUrls: ["./companies-list.component.css"]
})
export class CompaniesListComponent implements OnInit {
  selectedLetter: string = "TOP 1000";
  alphaBetArray = [
    "TOP 1000",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0 - 9"
  ];
  companies: any;
  constructor(
    private jobApi: JobsService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.meta.updateTag({
      name: "description",
      content:
        "Browse Jobs by Top 1000 Companies on Quikresults.in. Register Free to apply online for Job Vacancies across Top Companies in India."
    });
    this.titleService.setTitle(
      "Browse Jobs by Company - Jobs in Top Companies - Quikresults.in"
    );
  }

  ngOnInit() {
    this.jobApi.getJobsCompanies().subscribe(res => {
      this.companies = res["data"];
    });
  }
  selectedAplhaBet(selectedlet) {
    this.selectedLetter = selectedlet;
  }
}
