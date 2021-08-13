import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RoutingModule } from "../app-routing.module";
import { SideBarComponent } from "../components/side-bar/side-bar.component";

@NgModule({
    declarations: [
        SideBarComponent
    ],
    imports: [
        RoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    exports: [
        SideBarComponent,
        RoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ]
})
export class SharedModule {

}