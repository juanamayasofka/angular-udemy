import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {
  
  @Input() titulo: string='';
  @Input('data') doughnutChartData: any;
  @Input('type') doughnutChartType: any ;
  
  
}
