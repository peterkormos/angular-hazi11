import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../core/local-store.service';
import { TranslateService } from '../translate/translate.service';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | undefined>(undefined);

  constructor(readonly localStoreService: LocalStoreService) {
    this._currentUser.next(localStoreService.user);
  }

  registerUser(user: User) {
    this.localStoreService.user = user;
    this.localStoreService.translationCnt = 0;
    this._currentUser.next(user);
  }

  isRegistered() {
    return this.user !== undefined;
  }

  get user() {
    return this._currentUser.getValue();
  }
}
