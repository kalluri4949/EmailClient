import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface UserNameAvailableResponse {
  available: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isUserNameAvailable(username: string): any {
    return this.http.post<UserNameAvailableResponse>(
      'https://api.angular-email.com/auth/username',
      {
        username,
      }
    );
  }
}
