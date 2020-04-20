import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddComponent } from './form-generic/add.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomePageComponent },
  { path: "add", component: AddComponent },
  { path: "add/update/:id", component: AddComponent },
  { path: "**", component: HomePageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }