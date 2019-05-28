import { WINDOW } from "@ng-toolkit/universal";
import { Inject, AfterViewInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-google-text-ads",
  templateUrl: "./google-text-ads.component.html",
  styleUrls: ["./google-text-ads.component.css"]
})
export class GoogleTextAdsComponent implements OnInit, AfterViewInit {
  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit() {}
  ngAfterViewInit() {
    try {
      (this.window["adsbygoogle"] = this.window["adsbygoogle"] || []).push({});
    } catch (e) {
      console.error("error");
    }
  }
}
