import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './form-generic/add.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InMemoryDataService } from 'src/app/services/SEED.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsServices } from '../../services/validators.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { put204: false}),
    NgxPaginationModule
  ],
  providers: [InMemoryDataService, UserService, ValidatorsServices]
})
export class UserModule {}
