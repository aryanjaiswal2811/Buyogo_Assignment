import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] // or .scss if using SCSS
})
export class LoginComponent {
    emailOrPhone: string = '';
    password: string = '';
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private authService: AuthService) {}

    login(emailOrPhone: string, password: string) {
        this.errorMessage = ''; // Clear previous error messages
        this.successMessage = ''; // Clear previous success messages

        // Validate the user
        this.authService.validateUser(emailOrPhone, password).subscribe(isValid => {
            if (isValid) {
                this.successMessage = 'Login successful!';
                // Redirect to dashboard or home page
                // this.router.navigate(['/dashboard']);
            } else {
                this.errorMessage = 'Invalid email/phone or password.';
            }
        });
    }
}
