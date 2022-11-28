import { Injectable } from '@angular/core';
import { User } from '../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  private readonly userKey = 'user';
  private readonly translationCntKey = 'translationCnt';

  constructor() { }

  set user(user: User | undefined) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  get user() {
    let user = localStorage.getItem(this.userKey);
    if (user) {
      return JSON.parse(user);
    }
    else {
      return undefined;
    }
  }

  set translationCnt(translationCnt: number) {
    localStorage.setItem(this.translationCntKey, "" + (translationCnt++));
  }

  get translationCnt() {
    const translationCnt = localStorage.getItem(this.translationCntKey);
    return translationCnt ? +translationCnt : 0;
  }

  freeTranslationsAllowed() {
    console.log('this.localStoreService.translationCnt', this.translationCnt);
    return this.translationCnt <= 3;
  }
}
