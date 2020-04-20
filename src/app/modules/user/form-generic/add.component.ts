import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';



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

  get usuarioNoValido() {
    return (
      this.form.get("firstName").invalid && this.form.get("firstName").touched
    );
  }
  get lastNameNoValido() {
    return (
      this.form.get("lastName").invalid && this.form.get("lastName").touched
    );
  }
  get emailInValid() {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }
  get adressInValid() {
    return this.form.get("adress").invalid && this.form.get("adress").touched;
  }


  get phoneInValid() {
    return (
      this.form.get("phoneNumbers").invalid &&
      this.form.get("phoneNumbers").touched
    );
  }

  handleBuildForm(): void {
    this.form = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],
      phoneNumbers: this.fb.array([]),
      adress: ["", Validators.required]
    });
  }

  handleSave(): void {
    if (this.form.valid) {
      this.users = JSON.parse(localStorage.getItem("users"));
      this.user = this.form.value;
      this.user.id = this.users.length + 1;

      this.dbService.postUser(this.user).subscribe(data => {
        this.users.push(data);
        localStorage.setItem("users", JSON.stringify(this.users));
        console.log(this.users);
      });

      this.router.navigate(["/"]);
    }
  }

  handleEdit(): void {
    if (this.form.valid) {
      let array = JSON.parse(localStorage.getItem("users"));
      this.users = array;

      this.user = this.form.value;
      this.user.id = Number.parseInt(this.route.snapshot.paramMap.get("id"));

      this.dbService.putUser(this.user).subscribe(user => {
        const indexToUpdate = user
          ? this.users.findIndex(u => u.id == user.id)
          : -1;
        if (indexToUpdate > -1) {
          this.users[indexToUpdate] = user;
          localStorage.setItem("users", JSON.stringify(this.users));
        }
      });

      this.router.navigate(["/"]);
    }
  }

  handleGetById(): void {
    let dataLocal = JSON.parse(localStorage.getItem("users"));
    this.users = dataLocal;
    let id = this.route.snapshot.paramMap.get("id");
    let userById = this.users.filter(
      user => user.id === Number.parseInt(id)
    )[0];
    for (let i = 0; i < userById.phoneNumbers.length; i++) {
      this.handleAddNumber();
    }
    this.form.reset({
      firstName: userById.firstName,
      lastName: userById.lastName,
      email: userById.email,
      adress: userById.adress,
      phoneNumbers: userById.phoneNumbers
    });
    this.user = userById;
  }

  get phoneNumbers(): FormArray {
    return this.form.get("phoneNumbers") as FormArray;
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
    this.router.navigate(["/"])
  }
}

function validateSize(arr: FormArray) {
  return arr.length < 1
    ? {
        invalidSize: true
      }
    : null;
}

