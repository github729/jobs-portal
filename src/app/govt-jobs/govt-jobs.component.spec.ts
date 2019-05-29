import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtJobsComponent } from './govt-jobs.component';

describe('GovtJobsComponent', () => {
  let component: GovtJobsComponent;
  let fixture: ComponentFixture<GovtJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
