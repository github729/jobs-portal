import { Component, OnInit,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-ad',
  templateUrl: './google-ad.component.html',
  styleUrls: ['./google-ad.component.css']
})
export class GoogleAdComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    try{
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    }catch(e){
      console.error("error");
    }
  }
}
