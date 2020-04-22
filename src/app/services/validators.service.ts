import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class ValidatorsServices {
  form: FormGroup;

  constructor() {}

  validatePhoneInputs(phoneNumbers: number[]): any {
    for (let i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i].toString().length !== 10) {
        window.alert(
          "All the Number fields must have a value of 10 characters"
        );
        return false;
      }
    }
    return true;
  }

  get phoneNumbers(): FormArray {
    return this.form.get("phoneNumbers") as FormArray;
  }

  validateSize(arr: FormArray) {
    return arr.length < 1
      ? {
          invalidSize: true
        }
      : null;
  }
}