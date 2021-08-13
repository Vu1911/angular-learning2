import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SharedModule } from './modules/shared.module';
import { ProductModule } from './modules/product.module';
import { AccountModule } from './modules/account.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    LoginUserComponent,
    LoginFormComponent,
    HomepageComponent,
    
  ],
  imports: [
    SharedModule,
    ProductModule, 
    AccountModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
