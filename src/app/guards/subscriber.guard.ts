import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../providers/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriberGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user) => (user && user.roles.subscriber ? true : false)),
      tap((admin) => {
        if (!admin) {
          console.error('Access denied');
        }
      })
    );
  }
}
