import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';  // Import UserService

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.userService.getUserRole();

    // Cast next.data to any type, then access 'role'
    const routeRole = (next.data as any)['role'];

    // Check if the route requires a 'creator' role
    if (routeRole && routeRole !== userRole) {
      this.router.navigate(['/login']);  // Redirect to login page if role doesn't match
      return false;
    }

    return true;
  }
}
