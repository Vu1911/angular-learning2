import { NgModule } from "@angular/core";
import { UserFormComponent } from "../components/user-form/user-form.component";
import { UserTableComponent } from "../components/user-table/user-table.component";
import { UserDashboardComponent } from "../pages/user-dashboard/user-dashboard.component";
import { SharedModule } from "./shared.module";

@NgModule({
    declarations: [
        UserDashboardComponent,
        UserFormComponent,
        UserTableComponent,
    ],
    imports: [
        SharedModule
    ]
})
export class AccountModule {}