import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private msalService: MsalService, private router: Router) {}

  login() {
    const loginRequest = {
      scopes: ['user.read', 'openid', 'profile'], // Add necessary scopes
    };

    this.msalService.loginPopup(loginRequest).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.handleLoginResponse(response);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  handleLoginResponse(response: any) {
    // Retrieve user roles or claims from the token
    const roles = response.idTokenClaims['roles'];

    if (roles.includes('creator')) {
      this.router.navigate(['/creator']);
    } else {
      this.router.navigate(['/consumer']);
    }
  }
}
