import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationPath } from '../app-routing.module';
import { LocalStoreService } from '../core/local-store.service';
import { TranslateService } from '../translate/translate.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(readonly authService: AuthService, readonly router: Router, readonly localStoreService: LocalStoreService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStoreService.freeTranslationsAllowed() || this.localStoreService.isUserRegistered()) {
      return true;
    }
    else {
      this.router.navigateByUrl(RegistrationPath);
      return false;
    }
  }
}
