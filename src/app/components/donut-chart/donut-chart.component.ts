import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ChartType } from 'angular-google-charts';



@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() data = []
  @Output() isShowChart = new EventEmitter<boolean>()

  title = 'googlechart';  
  type: ChartType = ChartType.LineChart; 
  columnNames = ['Date', 'Quantity']
  options = {      
  };  
  width = 500;  
  height = 300;  

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.showChart()
  }

  showChart(){
    this.isShowChart.emit(true)
  }

  ngOnDestroy(){

  }

}
