import { JobsService } from './../jobs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
  locations: any;

  constructor(private jobsApi : JobsService) { }

  ngOnInit() {
     this.jobsApi.getAllLocations().subscribe(data => {
      if(data['success']) {
        this.locations = data['data'];
        console.log(this.locations)
      }
    })
  }

}
