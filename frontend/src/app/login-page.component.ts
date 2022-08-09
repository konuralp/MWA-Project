import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from './user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="login()" novalidate>
          <h2>Log In</h2>
          <mat-error *ngIf="!loginValid">
            {{loginErrText}}
          </mat-error>
          <mat-form-field>
            <input matInput placeholder="Email" name="email" formControlName="email" required>
            <mat-error>
              Please enter a valid email address.
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput type="password" placeholder="Password" name="password" formControlName="password" required>
            <mat-error>
              Password is required.
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" [disabled]="!loginForm.valid">Login</button>
        </form>
        <p>Don't have an account? <a [routerLink]="['/signup']">Sign Up.</a></p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: 2em auto;
        text-align: center;
      }

      mat-form-field {
        display: block;
      }
    `
  ]
})
export class LoginPageComponent implements OnInit {
  loginErrText: string = '';
  loginValid: boolean = true;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.minLength(0), Validators.required]]
    });
  }

  login() {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res: any) => {
          this.userService.userState$.next(res);
          this.userService.persistState();
          this.loginValid = true;
          this.router.navigate(['/pets']);
        },
        error: (err: any) => {
          this.loginErrText = err.error.message as string;
          this.loginValid = false;
          console.log(err.error.message);
        }
      });
  }

}
