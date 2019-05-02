import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ENV } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private httpOptions: any;
  currentUser: any;

  constructor(private _http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.currentUser != null ? this.currentUser.token:'Jobs'
      })
    };
  }
  // Post Job
  postJob(jobData) {
    return this._http
      .post(`${ENV.BASE_API}post-job`, jobData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Get all job Filters
  getJobFilters() {
    return this._http
      .get(`${ENV.BASE_API}job-filters`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get all Jobs
  getJobs(filterData?) {
    return this._http
      .post(`${ENV.BASE_API}jobs`, filterData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get top five jobs based on posted date
  topFiveJobs(){
    return this._http
    .get(`${ENV.BASE_API}top-five-jobs`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  // get all state
  getStates() {
    return this._http
      .get(`${ENV.BASE_API}states`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get all cities based on state id
  getCityBySateId(stateId) {
    return this._http
      .get(`${ENV.BASE_API}cities/${stateId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get job by id
  getJobById(jobId) {
    return this._http
      .get(`${ENV.BASE_API}job/${jobId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Post Job
  postResume(resumeData) {
    return this._http
      .post(`${ENV.BASE_API}post-resume`, resumeData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Get Resume for Login user Id
  getResume(userId) {
    return this._http
      .get(`${ENV.BASE_API}resume/${userId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Error: Unable to complete request. please try again later.');
  };
}
