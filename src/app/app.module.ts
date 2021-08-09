import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http/'
import { AccountService } from './services/account.service';
import { AdminGuard, AuthGuard, isAreadlyLoginGuard } from './services/authGuard.service';
import { ProductService } from './services/product.service';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductViewPageComponent } from './pages/product-view-page/product-view-page.component';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { SafeHtmlPipePipe } from './pipes/safe-html-pipe.pipe';
import { ChartsModule } from 'ng2-charts';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    LoginUserComponent,
    UserDashboardComponent,
    ProductDashboardComponent,
    LoginFormComponent,
    UserFormComponent,
    ProductFormComponent,
    UserTableComponent,
    ProductTableComponent,
    SideBarComponent,
    HomepageComponent,
    ProductViewComponent,
    ProductViewPageComponent,
    DonutChartComponent,
    ColorPipePipe,
    SafeHtmlPipePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    AccountService, 
    AuthGuard, 
    AdminGuard, 
    isAreadlyLoginGuard, 
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
