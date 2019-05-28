import { Meta, Title } from "@angular/platform-browser";
import { JobsService } from "./../jobs.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-locations-list",
  templateUrl: "./locations-list.component.html",
  styleUrls: ["./locations-list.component.css"]
})
export class LocationsListComponent implements OnInit {
  locations: any;

  constructor(
    private jobsApi: JobsService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.meta.updateTag({
      name: "description",
      content:
        "Find Jobs in major States/Cities in India Locations on Quikresults.in. Select your preferred location to find your dream job."
    });
    this.titleService.setTitle(
      "Browse Jobs by Location - Search Jobs in State/City/International Locations - Quikresults.in"
    );
  }

  ngOnInit() {
    this.jobsApi.getAllLocations().subscribe(data => {
      if (data["success"]) {
        this.locations = data["data"];
      }
    });
  }
}
