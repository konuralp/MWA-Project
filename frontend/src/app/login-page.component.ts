import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="login()" novalidate>
          <h2>Log In</h2>
          <mat-error *ngIf="!loginValid">
            The username and/or password is incorrect.
          </mat-error>
          <mat-form-field>
            <input matInput placeholder="Email" name="email" formControlName="email" required>
            <mat-error>
              Please provide a valid email address.
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <input matInput type="password" placeholder="Password" name="password" formControlName="password" required>
            <mat-error>
              Password must be at least 6 characters long.
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" [disabled]="!loginForm.valid">Login</button>
        </form>
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

  loginValid: boolean = true;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.loginValid = false;
  }

}
