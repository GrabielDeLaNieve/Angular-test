import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  user: User[];
  p: number = 1;

  constructor(private ls: LocalStorageService, private router: Router, private dbService: UserService) { }

  ngOnInit(): void {
    this.handleGetAll();
  }

  handleGetAll(): void {
    this.dbService.getAllUsers().subscribe((res: User[]) => {
      if (localStorage.getItem("users") !== null) {
        this.users = this.ls.handleGetLocalStorage();;
        return;
      }
      this.users = res;
      this.ls.handleSetLocalStorage(res);
    });
  }

  handleDelete(user: User): void {
    this.users = JSON.parse(localStorage.getItem("users"));
    this.users = this.users.filter(u => u.id != user.id);
    this.ls.handleSetLocalStorage(this.users);
  }
}
