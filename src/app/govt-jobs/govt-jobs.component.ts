import { JobsService } from "./../jobs.service";
import { Component, OnInit } from "@angular/core";
import { ENV } from "../app.settings";

@Component({
  selector: "app-govt-jobs",
  templateUrl: "./govt-jobs.component.html",
  styleUrls: ["./govt-jobs.component.css"]
})
export class GovtJobsComponent implements OnInit {
  govtJobs: any;
  serverUrl = ENV.SERVER_URL;

  constructor(private jobApi: JobsService) {}

  ngOnInit() {
    console.log(this.serverUrl);
    this.jobApi.getGovtJobs().subscribe(res => {
      if (res["success"]) {
        this.govtJobs = res["data"];
      }
    });
  }
}
