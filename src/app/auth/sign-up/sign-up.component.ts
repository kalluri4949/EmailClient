import { AuthService } from './../auth.service';
import { UniqueUserName } from './../validators/unique-user-name';
import { MatchPassword } from './../validators/match-password';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUserName.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUserName: UniqueUserName,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    } else {
      this.authService.signup(this.authForm.value).subscribe({
        next: (resp) => {
          // navigate to some route
          this.router.navigateByUrl('/inbox');
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ offLine: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
    }
  }
}
