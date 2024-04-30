import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  EmailValidator,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService, noSpaceValidator } from '@core';
import { RegisterRequest } from '@core/api/auth';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
  ],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isSubmitting: boolean = false;

  registerForm = this.fb.nonNullable.group(
    {
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required, noSpaceValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [this.matchValidator('password', 'confirmPassword')],
    }
  );

  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }

  register() {
    this.isSubmitting = true;

    const registerModel: RegisterRequest = {
      email: this.registerForm.value.email,
      fullName: this.registerForm.value.fullname,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
    };
    this.authService.register(registerModel).subscribe({
      next: res => {
        this.router.navigateByUrl('/');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
