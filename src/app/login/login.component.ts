import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';  // Import UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  // Simulate login by setting the user role based on email and password (static values)
  login() {
    // Static values to simulate roles based on email
    if (this.email === 'creator@example.com' && this.password === 'password123') {
      this.userService.setUserRole('creator');
      this.router.navigate(['/creator']);
    } else if (this.email === 'consumer@example.com' && this.password === 'password123') {
      this.userService.setUserRole('consumer');
      this.router.navigate(['/consumer']);
    } else {
      alert('Invalid credentials');
    }
  }
}
