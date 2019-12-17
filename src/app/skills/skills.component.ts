import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CVService } from '../service';
import { Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from '../route-animation';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [slideInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class SkillsComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log("Navigated to: " + cvService.routerIndex);
        cvService.routerIndex = 3;
      }

    });
  }

  


  public barChartOptions: ChartOptions = {
    scales: {
       yAxes: [{
          ticks: {
            stepSize: 1,
            
            beginAtZero: true
          },
          gridLines: {
            color: 'grey'
          }
                 
       }],
       xAxes: [{
          stacked: false,
          scaleLabel: {
             labelString: '' 
          },
          categoryPercentage: 0.1,
          barPercentage: 0.1,
          ticks: {
             stepSize: 1,
             min: 0,
             maxRotation: 90,
             minRotation: 90,
             autoSkip: false
          },
          gridLines: {
            color: 'grey'
          }     
       }]
    },
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: 'grey' }
    }
 };


  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend =false;
  public barChartPlugins = [pluginDataLabels];

  public barChartProgrammeertalenLabels: Label[] = [
    'Java SE8*', 
    'C#.net', 
    'VB', 
    'VB.net', 
    'Pascal', 
    '(My)SQL'
  ];
  public barChartProgrammeertalenData: ChartDataSets[] = [
    { data: [2, 1, 3, 2, 2, 1], 
      label: 'IT - Programmeertalen', 
      backgroundColor: 'rgb(5, 175, 179)',
     hoverBackgroundColor: 'rgb(1, 70, 71)' }
  ];

  public barChartBackendLabels: Label[] = [
    'Spring(boot, data)',
    'Hibernate/JPA',
    'Lambda-expressies', 
    'XML/JSON', 
    'REST/HTTP', 
    'Linux/Ubuntu',
    'Maven',
    'JUnit, Mockito, Cucumber'
  ];
  public barChartBackendData: ChartDataSets[] = [
    { data: [1, 1, 2, 1, 1, 2, 1, 1], 
      label: 'IT - Backend', 
      backgroundColor: 'rgb(5, 175, 179)',
      hoverBackgroundColor: 'rgb(1, 70, 71)' }
  ];

  public barChartFrontendLabels: Label[] = [
    'HTML5/CSS3', 
    'JavaScript', 
    'Typescript',
    'Angular 8',
    'NodeJS/NPM', 
    'CorelDraw', 
    'PhotoShop'
  ];
  public barChartFrontendData: ChartDataSets[] = [
    { data: [3, 3, 1, 1, 1, 3, 2], 
      label: 'IT - Frontend', 
      backgroundColor: 'rgb(5, 175, 179)',
      hoverBackgroundColor: 'rgb(1, 70, 71)' }
  ];

  public barChartOverigeLabels: Label[] = [
    'Haskell',
    'Postman',
    'Xampp',
    'Git(hub)'
  ];
  public barChartOverigeData: ChartDataSets[] = [
    { data: [2,1,1,1], 
      label: 'IT - Overige', 
      backgroundColor: 'rgb(5, 175, 179)',
      hoverBackgroundColor: 'rgb(1, 70, 71)'}
  ];

  public barChartSoftskillsLabels: Label[] = [
    'Nederlands',
    'Engels',
    'Duits',
    'Frans',
    'Scrum (PSM1)*',
    'Agile'
  ];
  public barChartSoftskillsData: ChartDataSets[] = [
    { data: [3,3,1,1,1,1], 
      label: 'IT - Soft Skills', 
      backgroundColor: 'rgb(5, 175, 179)',
      hoverBackgroundColor: 'rgb(1, 70, 71)' }
  ];

  ngOnInit() {

  }

}
