import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UniqueUserName implements AsyncValidator {
  constructor(private authservice: AuthService) {}
  validate = (control: FormControl): any => {
    const { value } = control;
    return this.authservice.isUserNameAvailable(value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        // console.log(err);
        if (err.error.username) {
          return of({
            nonUniqueUserName: true,
          });
        } else {
          return of({
            noConnection: true,
          });
        }
      })
    );
    // tslint:disable-next-line:semicolon
  };
}
