import { NgModule } from "@angular/core";
import { DonutChartComponent } from "../components/donut-chart/donut-chart.component";
import { ProductFormComponent } from "../components/product-form/product-form.component";
import { ProductTableComponent } from "../components/product-table/product-table.component";
import { ProductViewComponent } from "../components/product-view/product-view.component";
import { ProductDashboardComponent } from "../pages/product-dashboard/product-dashboard.component";
import { ProductViewPageComponent } from "../pages/product-view-page/product-view-page.component";
import { ColorPipePipe } from "../pipes/color-pipe.pipe";
import { SafeHtmlPipePipe } from "../pipes/safe-html-pipe.pipe";
import { SharedModule } from "./shared.module";
import { IoproductFormComponent } from '../components/ioproduct-form/ioproduct-form.component';
import { GoogleChartsModule } from "angular-google-charts";
import { ChangeColorDirective } from '../directives/change-color.directive';

@NgModule({
    declarations: [
        ProductDashboardComponent,
        ProductFormComponent,
        ProductTableComponent,
        ProductViewComponent,
        ProductViewPageComponent,
        DonutChartComponent,
        ColorPipePipe,
        SafeHtmlPipePipe,
        IoproductFormComponent,
        ChangeColorDirective
    ],
    imports: [ 
        SharedModule,
        GoogleChartsModule
    ]
})
export class ProductModule {

}