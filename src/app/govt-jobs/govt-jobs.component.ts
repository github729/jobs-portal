import { JobsService } from "./../jobs.service";
import { Component, OnInit } from "@angular/core";
import { ENV } from "../app.settings";

@Component({
  selector: "app-govt-jobs",
  templateUrl: "./govt-jobs.component.html",
  styleUrls: ["./govt-jobs.component.css"]
})
export class GovtJobsComponent implements OnInit {
  serverUrl = ENV.SERVER_URL;
  stateWiseGovtJobs: any;
  industriesWiseGovtJobs: any;

  constructor(private jobApi: JobsService) {}

  ngOnInit() {
    this.jobApi.getGovtJobsByStates().subscribe(res => {
      if (res["success"]) {
        this.stateWiseGovtJobs = res["data"];
      }
    });
    this.jobApi.getGovtJobsByIndustries().subscribe(res => {
      if (res["success"]) {
        this.industriesWiseGovtJobs = res["data"];
      }
    });
  }
}
