import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable()
export class JwtService {
  destroyUser() {
    window.localStorage.removeItem('loggedUser');
  }
  getUser(): User {
    if (window.localStorage['loggedUser'])
      return JSON.parse(window.localStorage['loggedUser']);
    return {} as User;
  }
  saveUser(user: User) {
    window.localStorage['loggedUser'] = JSON.stringify(user);
  }
}