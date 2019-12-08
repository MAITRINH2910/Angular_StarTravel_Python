import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardAdminComponent } from './account-Admin/dashboard-admin/dashboard-admin.component';
import { LayoutAdminComponent } from './account-Admin/layout-admin/layout-admin.component';
import { EditProfileAdminComponent } from './account-Admin/profile/edit-profile-admin/edit-profile-admin.component';
import { ViewProfileAdminComponent } from './account-Admin/profile/view-profile-admin/view-profile-admin.component';
import { AllHotelComponent } from './account-Admin/list-hotel/all-hotel/all-hotel.component';
import { ApprovedHotelComponent } from './account-Admin/list-hotel/approved-hotel/approved-hotel.component';
import { PendingHotelComponent } from './account-Admin/list-hotel/pending-hotel/pending-hotel.component';
import { ListUserComponent } from './account-Admin/list-user/list-user.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomepageComponent } from './account-Guest/homepage/homepage.component';
import { DetailHotelComponent } from './account-Guest/detail-hotel/detail-hotel.component';
import { TopHotelComponent } from './account-Guest/top-hotel/top-hotel.component';
import { PredictHotelComponent } from './account-Guest/predict-hotel/predict-hotel.component';
import { LayoutComponent } from './account-Guest/layout/layout.component';
import { LayoutOwnerComponent } from './account-Owner/layout-owner/layout-owner.component';
import { DashboardOwnerComponent } from './account-Owner/dashboard-owner/dashboard-owner.component';
import { AllHotelOwnerComponent } from './account-Owner/hotel/all-hotel-owner/all-hotel-owner.component';
import { AddHotelComponent } from './account-Owner/hotel/add-hotel/add-hotel.component';
import { EditProfileOwnerComponent } from './account-Owner/profile/edit-profile-owner/edit-profile-owner.component';
import { ViewProfileOwnerComponent } from './account-Owner/profile/view-profile-owner/view-profile-owner.component';
import { EditHotelComponent } from './account-Owner/hotel/edit-hotel/edit-hotel.component';
import { RoleGuard } from './guard/role.guard';


@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    LayoutAdminComponent,
    EditProfileAdminComponent,
    ViewProfileAdminComponent,
    AllHotelComponent,
    ApprovedHotelComponent,
    PendingHotelComponent,
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    DetailHotelComponent,
    TopHotelComponent,
    PredictHotelComponent,
    LayoutComponent,
    LayoutOwnerComponent,
    DashboardOwnerComponent,
    AllHotelOwnerComponent,
    AddHotelComponent,
    EditProfileOwnerComponent,
    ViewProfileOwnerComponent,
    EditHotelComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
