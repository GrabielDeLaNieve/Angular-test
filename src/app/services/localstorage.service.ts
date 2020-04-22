import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  id: string[] = []

  constructor() { }


  handleGetLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem("users"));
  }

  handleSetLocalStorage(users: User[] ) {
    localStorage.setItem("users", JSON.stringify(users)) ;
  }

  handleClearLocalStorage(): any {
    localStorage.removeItem("users");
  }
}
