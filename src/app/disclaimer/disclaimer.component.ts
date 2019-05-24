import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  constructor(private meta: Meta, private titleService: Title) {
    this.meta.updateTag({
      name: "keywords",
      content: "quickresults,quikrresults"
    });
    this.titleService.setTitle("QuikResults.in - Disclaimer");
  }

  ngOnInit() {}

}
