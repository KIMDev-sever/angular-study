import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
/*
데이터베이스 연동 요함
 */
export class MainChartComponent implements OnInit, AfterViewInit {
  // tslint:disable:variable-name
  @ViewChild('newMemberChart')
  newMemberChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('newContentCount')
  newContentCount: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  month_arry = [];
  sampleData_arry = [];
  constructor() { }
  ngAfterViewInit(): void {

    for (let index = 0; index < 12; index++) {
      this.month_arry.push((index + 1) + '월');
      const data = Math.round(Math.random() * 100);
      this.sampleData_arry.push(data);
    }
    this.initCart('bar', '신규회원수', this.newMemberChart);
    this.initCart('pie', '컨텐츠 조회수', this.newContentCount);
  }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  initCart(types: string, labels: string, el: ElementRef<HTMLCanvasElement>) {
    const context = el.nativeElement.getContext('2d');
    // tslint:disable-next-line:no-unused-expression
    new Chart(context, {
      type: types,
      data: {
        labels: this.month_arry,
        datasets: [{
          label: '',
          data: this.sampleData_arry,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 2, 123, 1)',
            'rgba(54, 3, 235, 1)',
            'rgba(123, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(5, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
