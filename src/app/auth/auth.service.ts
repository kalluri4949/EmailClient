import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface UserNameAvailableResponse {
  available: boolean;
}
interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignupResponse {
  username: string;
}

interface SigninResponse {
  authenticated: boolean;
}
interface SigninCredentials {
  userName: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(false);
  rootUrl = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {}
  isUserNameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }
  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
  checkAuthentication() {
    // to check isSigned in
    return this.http.get<SigninResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      })
    );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }
  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }
}
