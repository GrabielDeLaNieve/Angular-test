import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [FooterComponent, NavbarComponent, HomePageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    HomePageComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
