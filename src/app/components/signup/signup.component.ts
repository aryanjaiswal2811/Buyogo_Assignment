import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // or .scss if using SCSS
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      emailOrPhone: ['', [Validators.required, Validators.email]],
      createPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name() {
    return this.signupForm.get('name');
  }

  get emailOrPhone() {
    return this.signupForm.get('emailOrPhone');
  }

  get createPassword() {
    return this.signupForm.get('createPassword');
  }

  continueToStep2() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    // Save data in local storage for Step2Component
    localStorage.setItem('signupData', JSON.stringify(this.signupForm.value));

    // Navigate to Step2Component
    this.router.navigate(['/signup/step2']);
  }
  goToLogin() {
    this.router.navigate(['/login']); // Navigate to the login route
}
}
