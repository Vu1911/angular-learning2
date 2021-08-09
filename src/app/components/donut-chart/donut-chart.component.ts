import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit, OnChanges {

  @Input() labels: string[] = []
  @Input() data: number[] = []

  labelChart: Label[] = []
  chartType: ChartType = 'doughnut'
  chartData: MultiDataSet = []
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.labels.forEach((title)=>{
      this.labelChart.push(title)
    })
    this.chartData = [this.data]
  }

}
