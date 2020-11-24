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

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}
interface SigninCredentials {
  userName: string;
  password: string;
}
interface SignInResponse {
  username: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(null);
  rootUrl = 'https://api.angular-email.com';
  userName = '';
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
        tap((response) => {
          this.signedin$.next(true);
          this.userName = response.username;
        })
      );
  }
  checkAuthentication() {
    // to check isSigned in
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.userName = username;
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
    return this.http
      .post<SignInResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap((response) => {
          this.signedin$.next(true);
          this.userName = response.username;
        })
      );
  }
}
