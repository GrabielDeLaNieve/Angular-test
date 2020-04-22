import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ValidatorsServices } from 'src/app/services/validators.service';



@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  form: FormGroup;
  switch: boolean = false;
  users: User[];
  user: User;
  edit: boolean;

  constructor(
    public fb: FormBuilder,
    public dbService: UserService,
    public ls: LocalStorageService,
    public vl: ValidatorsServices,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleBuildForm();
    this.handleEditOrSave();
  }

  handleEditOrSave(): void {
    if (this.route.snapshot.paramMap.get("id")) {
      this.edit = true;
      this.handleGetById();
    } else {
      this.edit = false;
    }
  }
  get phoneNumbers(): FormArray {
    return this.form.get("phoneNumbers") as FormArray;
  }

  handleBuildForm(): void {
    this.form = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", Validators.required],
      email: [ "", [ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],
      phoneNumbers: this.fb.array([]),
      adress: ["", Validators.required]
    });
  }

  handleSave(): void {
    if (
      this.form.valid &&
      this.vl.validatePhoneInputs(this.form.value.phoneNumbers)
    ) {
      if (this.ls.handleGetLocalStorage != null) {
        this.users = [...this.ls.handleGetLocalStorage()];
        this.user = this.form.value;
        this.user.id =
          this.users.length === 0
            ? 1
            : this.users[this.users.length - 1].id + 1;
        this.users.push(this.user);
        this.ls.handleSetLocalStorage(this.users);
        this.router.navigate(["/"]);
      }
    }
  }

  handleEdit(): void {
    if (
      this.form.valid &&
      this.vl.validatePhoneInputs(this.form.value.phoneNumbers)
    ) {
      let array = this.ls.handleGetLocalStorage();
      this.users = array;
      this.user = this.form.value;
      this.user.id = Number.parseInt(this.route.snapshot.paramMap.get("id"));
      this.dbService.putUser(this.user).subscribe(user => {
        const indexToUpdate = user
          ? this.users.findIndex(u => u.id == user.id)
          : -1;
        if (indexToUpdate > -1) {
          this.users[indexToUpdate] = user;
          this.ls.handleSetLocalStorage(this.users);
        }
      });
      this.router.navigate(["/"]);
    }
  }

  handleGetById(): void {
    let dataLocal = this.ls.handleGetLocalStorage();
    this.users = dataLocal;
    let id = this.route.snapshot.paramMap.get("id");
    let userById = this.users.filter(
      user => user.id === Number.parseInt(id)
    )[0];
    for (let i = 0; i < userById.phoneNumbers.length; i++) {
      this.handleAddNumber();
    }
    this.resetForm(userById);
    this.user = userById;
  }

  resetForm(user): any {
    return this.form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      adress: user.adress,
      phoneNumbers: user.phoneNumbers
    });
  }

  handleAddNumber(): void {
    this.switch = true;
    this.phoneNumbers.push(this.fb.control(""));
  }

  handleDeleteNumber(i: number): void {
    this.phoneNumbers.removeAt(i);
    if (i === 0) {
      this.switch = false;
    }
  }

  redirectAction() {
    this.router.navigate(["/"]);
  }
}