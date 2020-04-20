import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URI = 'api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.URI);
  }

  postUser(payload: User): Observable<User>{
    return this.http.post<User>(this.URI, payload);
  }

  putUser(payload: User): Observable<User>{
    return this.http.put<User>(this.URI, payload);
  }

  deleteUser(id: string): Observable<{}>{
    this.URI = `${this.URI}/${id}`;
    return this.http.delete(this.URI);
  }


}
