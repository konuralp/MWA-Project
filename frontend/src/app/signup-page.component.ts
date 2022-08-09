import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StepperOrientation} from '@angular/material/stepper';
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {UserService} from './user.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  template: `
    <mat-card>
      <mat-stepper [linear]="true" #stepper [orientation]="(stepperOrientation | async)!">
        <mat-step [stepControl]="emailFormGroup">
          <form [formGroup]="emailFormGroup">
            <ng-template matStepLabel>Give email</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput placeholder="A valid email for login" formControlName="email" required>
              <mat-error>
                Please enter a valid email address.
              </mat-error>
            </mat-form-field>
            <div>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="passwordFormGroup" label="Choose a password">
          <form [formGroup]="passwordFormGroup">
            <mat-form-field appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput [type]="hide ? 'password' : 'text'" formControlName="password" placeholder="A strong password" required>
              <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error>
                Password should be at least 6 characters long.
              </mat-error>
            </mat-form-field>
            <div>
              <button mat-button matStepperPrevious>Back</button>
              <span class="spacer"></span>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="nameFormGroup">
          <form [formGroup]="nameFormGroup">
            <ng-template matStepLabel>Fill out your full name</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Full Name</mat-label>
              <input matInput placeholder="Ex. Elon Tusk" formControlName="name" required>
              <mat-error>
                Name is required.
              </mat-error>
            </mat-form-field>
            <div>
              <button mat-button matStepperPrevious>Back</button>
              <span class="spacer"></span>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="phoneFormGroup" [optional]="true">
          <form [formGroup]="phoneFormGroup">
            <ng-template matStepLabel>Fill out your phone number</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Phone Number</mat-label>
              <span matPrefix>+1 &nbsp;</span>
              <input type="tel" matInput placeholder="555-444-3333" formControlName="phone">
            </mat-form-field>
            <div>
              <button mat-button matStepperPrevious>Back</button>
              <span class="spacer"></span>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Done</ng-template>
          <p>You are almost finished, would you like to create your account and get started?</p>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <span class="spacer"></span>
            <button mat-raised-button color="primary" (click)="signup()">Create Account</button>
          </div>
        </mat-step>
      </mat-stepper>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin: 2em 1em;
        text-align: center;
      }

      mat-form-field {
        display: block;
        width: 50%;
        margin: 20px auto;
      }

      .spacer {
        margin: 10px;
      }
    `
  ]
})
export class SignupPageComponent implements OnInit {

  emailFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  passwordFormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hide = true;
  nameFormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  phoneFormGroup = this.fb.group({
    phone: [''],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private userService: UserService,
              private _snackBar: MatSnackBar, private router: Router) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  }

  signup() {
    this.userService.signup(this.emailFormGroup.value.email as string, this.passwordFormGroup.value.password as string,
      this.nameFormGroup.value.name as string, this.phoneFormGroup.value.phone as string).subscribe({
      next: (res: any) => {
        this.userService.userState$.next(res);
        this.userService.persistState();
        this.router.navigate(['/pets']);
      },
      error: (err: any) => {
        this._snackBar.open(err.error.message ? err.error.message : err.message, 'Dismiss', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    });
  }

}
