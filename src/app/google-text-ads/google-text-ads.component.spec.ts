import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTextAdsComponent } from './google-text-ads.component';

describe('GoogleTextAdsComponent', () => {
  let component: GoogleTextAdsComponent;
  let fixture: ComponentFixture<GoogleTextAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleTextAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTextAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
