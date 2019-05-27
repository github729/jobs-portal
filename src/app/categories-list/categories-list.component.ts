import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: any;

  constructor(private jobApi: JobsService) { }

  ngOnInit() {
    this.jobApi.getJobsCategories().subscribe(res => {
      console.log(res);
      this.categories = res['data'];
    })
  }

}
