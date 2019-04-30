import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ENV } from './app.settings';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions: any;
  currentUser: any;

  constructor(private _http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'Authorization': this.currentUser != null ? this.currentUser.token : 'Jobs'
      })
    };
  }
  LoginUser(userData) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${ENV.BASE_API}sign-in`, JSON.stringify(userData), { headers: headers })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            this.currentUser = response.data;
            const userObj: any = {};
            userObj.user = response.data;
            userObj.token = response.token;
            localStorage.setItem('currentUser', JSON.stringify(userObj));
          }
        }),
        catchError(this.handleError)
      );
  }
  // logout event
  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Create User
  registerUser(userData) {
    return this._http
      .post(`${ENV.BASE_API}sign-up`, userData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Create User
  getUserById(userId) {
    return this._http
      .get(`${ENV.BASE_API}user/${userId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Update User
  updateUser(userData) {
    return this._http
      .put(`${ENV.BASE_API}update-user`, userData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  changePwd(userData) {
    return this._http
      .put(`${ENV.BASE_API}change-password`, userData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Delete User
  deleteUser(userId) {
    return this._http
      .delete(`${ENV.BASE_API}close-account/${userId}`, this.httpOptions)
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
