import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';


@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  

  constructor(private db: UserService, private ls: LocalStorageService) {}

  ngOnInit(): void {
    this.handleLoadU();
  }

  handleLoadU(): void {
    this.ls.handleGetLocalStorage ? null : this.db.getAllUsers().subscribe(
      res => this.ls.handleSetLocalStorage(res),
      error => console.log(error)
    );
  }
}
