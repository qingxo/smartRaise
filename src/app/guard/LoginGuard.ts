import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import storage from '../shared/storage';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    if (storage.get('state')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
