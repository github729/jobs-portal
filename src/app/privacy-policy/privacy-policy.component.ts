import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.css"]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {
    this.meta.updateTag({
      name: "keywords",
      content: "quickresults,quikrresults"
    });
    this.titleService.setTitle("QuikResults.in - Privacy Policy");
  }

  ngOnInit() {}
}
