import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRole: string | null = null;

  constructor() {
    // Attempt to load the user role from localStorage (if it exists)
    this.userRole = localStorage.getItem('userRole');
  }

  // Method to get the user role
  getUserRole(): string | null {
    return this.userRole;
  }

  // Method to set the user role (and save it in localStorage)
  setUserRole(role: string): void {
    this.userRole = role;
    localStorage.setItem('userRole', role); // Store role in localStorage to persist
  }

  // Method to clear the user role (e.g., for logout)
  clearUserRole(): void {
    this.userRole = null;
    localStorage.removeItem('userRole');
  }
}
