import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  constructor(private authservice: AuthService) {
    this.signedin$ = this.authservice.signedin$;
  }

  ngOnInit() {
    this.authservice.checkAuthentication().subscribe(() => {});
  }
}
