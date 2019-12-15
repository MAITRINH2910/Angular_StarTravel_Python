import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from "./account-Guest/layout/layout.component";
import { HomepageComponent } from "./account-Guest/homepage/homepage.component";
import { PredictHotelComponent } from "./account-Guest/predict-hotel/predict-hotel.component";
import { TopHotelComponent } from "./account-Guest/top-hotel/top-hotel.component";
import { DetailHotelComponent } from "./account-Guest/detail-hotel/detail-hotel.component";

import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { RoleGuard } from "./guard/role.guard";

import { LayoutAdminComponent } from "./account-Admin/layout-admin/layout-admin.component";
import { DashboardAdminComponent } from "./account-Admin/dashboard-admin/dashboard-admin.component";
import { ListUserComponent } from "./account-Admin/list-user/list-user.component";
import { PendingHotelComponent } from "./account-Admin/list-hotel/pending-hotel/pending-hotel.component";
import { AllHotelComponent } from "./account-Admin/list-hotel/all-hotel/all-hotel.component";
import { ApprovedHotelComponent } from "./account-Admin/list-hotel/approved-hotel/approved-hotel.component";
import { ViewProfileAdminComponent } from "./account-Admin/profile/view-profile-admin/view-profile-admin.component";
import { EditProfileAdminComponent } from "./account-Admin/profile/edit-profile-admin/edit-profile-admin.component";

import { DashboardOwnerComponent } from "./account-Owner/dashboard-owner/dashboard-owner.component";
import { AllHotelOwnerComponent } from "./account-Owner/hotel/all-hotel-owner/all-hotel-owner.component";
import { AddHotelComponent } from "./account-Owner/hotel/add-hotel/add-hotel.component";
import { ViewProfileOwnerComponent } from "./account-Owner/profile/view-profile-owner/view-profile-owner.component";
import { EditProfileOwnerComponent } from "./account-Owner/profile/edit-profile-owner/edit-profile-owner.component";
import { LayoutOwnerComponent } from "./account-Owner/layout-owner/layout-owner.component";
import { AuthGuard } from "./guard/auth.guard";
import { RegisterOwnerComponent } from "./auth/register-owner/register-owner.component";
import { LoginOwnerComponent } from "./auth/login-owner/login-owner.component";
import { EditHotelComponent } from './account-Admin/list-hotel/edit-hotel/edit-hotel.component';
import { EditHotelOwnerComponent } from './account-Owner/hotel/edit-hotel-owner/edit-hotel-owner.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomepageComponent
      },
      {
        path: "top-hotel",
        component: TopHotelComponent
      },
      {
        path: "predicted-hotel",
        component: PredictHotelComponent
      },
      {
        path: "detail-hotel/:id",
        component: DetailHotelComponent,
      }
    ]
  },

  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register-owner",
    component: RegisterOwnerComponent
  },
  {
    path: "login-owner",
    component: LoginOwnerComponent
  },

  {
    path: "admin",
    component: LayoutAdminComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: "ADMIN"
    },
    children: [
      {
        path: "",
        redirectTo: "estay",
        pathMatch: "full"
      },
      {
        path: "estay",
        component: DashboardAdminComponent
      },
      {
        path: "users/list-user",
        component: ListUserComponent
      },
      {
        path: "listing/pending-hotel",
        component: PendingHotelComponent
      },
      {
        path: "listing/all-hotel",
        component: AllHotelComponent
      },
      {
        path: "listing/approved-hotel",
        component: ApprovedHotelComponent
      },
      {
        path: "listing/edit-hotel/:id",
        component: EditHotelComponent
      },
      {
        path: "profile/view-profile",
        component: ViewProfileAdminComponent
      },
      {
        path: "profile/change-password",
        component: EditProfileAdminComponent
      }
    ]
  },

  {
    path: "host",
    component: LayoutOwnerComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: "HOTEL_OWNER"
    },
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardOwnerComponent
      },
      {
        path: "hotel/all-hotel",
        component: AllHotelOwnerComponent
      },
      {
        path: "hotel/add-hotel",
        component: AddHotelComponent
      },
      {
        path: "hotel/edit-hotel/:id",
        component: EditHotelOwnerComponent
      },
      {
        path: "profile/view-profile",
        component: ViewProfileOwnerComponent
      },
      {
        path: "profile/change-password",
        component: EditProfileOwnerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
