import { Injectable } from '@angular/core';
import { skipWhile, take, tap } from 'rxjs/operators';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedin$.pipe(
      skipWhile((value) => {
        return value === null;
      }),
      take(1),
      tap((value) => {
        if (!value) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
