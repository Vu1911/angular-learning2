import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { LoginAdminComponent } from "./pages/login-admin/login-admin.component";
import { LoginUserComponent } from "./pages/login-user/login-user.component";
import { ProductDashboardComponent } from "./pages/product-dashboard/product-dashboard.component";
import { ProductViewPageComponent } from "./pages/product-view-page/product-view-page.component";
import { UserDashboardComponent } from "./pages/user-dashboard/user-dashboard.component";
import { AccountService } from "./services/account.service";
import { AdminGuard, AuthGuard, isAreadlyLoginGuard } from "./services/authGuard.service";

const appRouters: Routes = [
    { path: "user/login", canActivate: [isAreadlyLoginGuard], component: LoginUserComponent},
    { path: "user/product-dashboard", canActivate: [AuthGuard], component: ProductDashboardComponent},
    { path: "user/product/:id", canActivate: [AuthGuard], component: ProductViewPageComponent},
    { path: "user", canActivate: [AuthGuard], component: HomepageComponent},
    { path: "admin/login", canActivate: [isAreadlyLoginGuard], component: LoginAdminComponent},
    { path: "admin/user-dashboard", canActivate: [AdminGuard], component: UserDashboardComponent},
    { path: "admin", canActivate: [AdminGuard], component: HomepageComponent},
    { path: "**", redirectTo: "/user/login"}
]


@NgModule({
      imports: [
        RouterModule.forRoot(appRouters)
      ],
      exports: [RouterModule]
})
export class RoutingModule {

}