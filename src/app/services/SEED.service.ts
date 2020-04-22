import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {
        id: 0,
        firstName: "Grabiel",
        lastName: "De La Nieve",
        email: "grabiel@gmail.com",
        adress: "Los Mogotes",
        phoneNumbers: ["8094034705" ]
      },
      {
        id: 1,
        firstName: "Darlin",
        lastName: "De La Nieve",
        email: "darlin@gmail.com",
        adress: "Samana",
        phoneNumbers: ["8094563625"]
      },
      {
        id: 2,
        firstName: "Franny",
        lastName: "Tejada",
        email: "franny@gmail.com",
        adress: "La Romana",
        phoneNumbers: ["8095681236"]
      },
      {
        id: 3,
        firstName: "Kevin",
        lastName: "Smith",
        email: "kevin@gmail.com",
        adress: "Higuey",
        phoneNumbers: ["8095642315"]
      },
      {
        id: 4,
        firstName: "Darwin",
        lastName: "De La Nieve",
        email: "darwin@gmail.com",
        adress: "Puerto Plata",
        phoneNumbers: ["8066543815"]
      },
      {
        id: 5,
        firstName: "Johan",
        lastName: "Rivas",
        email: "johan@gmail.com",
        adress: "Monte Plata",
        phoneNumbers: ["809531256" ]
      },
      {
        id: 6,
        firstName: "Pedro",
        lastName: "Ramirez",
        email: "pedroramirez@gmail.com",
        adress: "Bani",
        phoneNumbers: ["8095648315"]
      },
      {
        id: 7,
        firstName: "Karen",
        lastName: "Dominguez",
        email: "karen@gmail.com",
        adress: "San Cristobal",
        phoneNumbers: ["8092136954"]
      },
      {
        id: 8,
        firstName: "Minerva",
        lastName: "Perez",
        email: "minerva@gmail.com",
        adress: "Santo Domingo",
        phoneNumbers: ["8095642452" ]
      },
      {
        id: 9,
        firstName: "yayaay",
        lastName: "Herrera",
        email: "ramon@gmail.com",
        adress: "Villa Altagracia",
        phoneNumbers: ["8095465421"]
      }
    ];
    return { users };
  }
}
