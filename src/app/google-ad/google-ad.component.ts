import { Component, OnInit,AfterViewInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-google-ad',
  templateUrl: './google-ad.component.html',
  styleUrls: ['./google-ad.component.css']
})
export class GoogleAdComponent implements OnInit,AfterViewInit {

  constructor(@Inject(WINDOW) private window: Window, ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    try{
      (this.window['adsbygoogle'] = this.window['adsbygoogle'] || []).push({});
    }catch(e){
      console.error("error");
    }
  }
}
