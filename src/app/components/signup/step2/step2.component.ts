import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/auth.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  step2Form: FormGroup;
  organizations: string[] = [];
  errors: any = {};
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store, private router: Router) {
    this.step2Form = this.fb.group({
      organization: ['', Validators.required],
      designation: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit() {
    this.authService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs.map(org => org.name);
    });

    const savedData = JSON.parse(localStorage.getItem('signupData') || '{}');
    if (savedData) {
      this.step2Form.patchValue({
        organization: savedData.organization || '',
        designation: savedData.designation || '',
        birthDate: savedData.birthDate || '',
        city: savedData.city || '',
        pincode: savedData.pincode || ''
      });
    }
  }

  validateOrganization() {
    const organization = this.step2Form.value.organization;
    const validOrg = this.organizations.includes(organization);
    if (!validOrg) {
      this.errors.organization = 'Unknown organization-id';
    } else {
      this.errors.organization = null;
    }
  }

  next() {
    debugger
    this.validateOrganization(); // Validate organization when submitting
    const newId = this.authService.getNextUserId();
    if (this.step2Form.valid && !this.errors.organization) {
      const userData: User = {
        id: newId,
        name: JSON.parse(localStorage.getItem('signupData') || '{}').name,
        email: JSON.parse(localStorage.getItem('signupData') || '{}').emailOrPhone,
        phoneNumber: JSON.parse(localStorage.getItem('signupData') || '{}').emailOrPhone, // Assuming phoneNumber is the same as emailOrPhone
        password: JSON.parse(localStorage.getItem('signupData') || '{}').createPassword,
        organization: this.step2Form.value.organization,
        designation: this.step2Form.value.designation,
        birthDate: this.step2Form.value.birthDate,
        city: this.step2Form.value.city,
        pincode: this.step2Form.value.pincode,
      };

      // Save user data
      this.authService.saveUserData(userData);

      // Dispatch login action
      this.store.dispatch(login({ user: userData }));

      // Show success message
      this.successMessage = 'Signup successful!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Navigate after 2 seconds to show success message
    }
  }
}
