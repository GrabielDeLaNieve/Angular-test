import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  users: User[];
  user: User[];
  p: number = 1;

  constructor(private router: Router, private dbService: UserService) {}

  ngOnInit(): void {
    this.handleGetAll();
  }

  handleDelete(user: User): void {
    this.users = JSON.parse(localStorage.getItem("users"));
    this.users = this.users.filter(u => u.id != user.id);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  handleGetAll(): void {
    this.dbService.getAllUsers().subscribe((res: User[]) => {
      if (localStorage.getItem("users") != null) {
        this.users = JSON.parse(localStorage.getItem("users"));
        return;
      }
      this.users = res;
      localStorage.setItem("users", JSON.stringify(res));
    });
  }
}
