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
  @ViewChild('count_by_mounth')
  count_by_mounth: ElementRef<HTMLCanvasElement>;
  @ViewChild('count_by_category')
  count_by_category: ElementRef<HTMLCanvasElement>;
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
    const category_Arrys = ['아이스크림', '자동차', '컴퓨터', '고기', '생선', '주식', '부동산', '치킨', '피자', '집행검', '비트코인', '공기'];
    this.initCart('bar', '', this.count_by_mounth, this.month_arry);
    this.initCart('pie', '', this.count_by_category, category_Arrys);
  }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  initCart(types: string, label: string, el: ElementRef<HTMLCanvasElement>, labels: string[]) {
    const context = el.nativeElement.getContext('2d');
    // tslint:disable-next-line:no-unused-expression
    new Chart(context, {
      type: types,
      data: {
        labels,
        datasets: [{
          label,
          data: this.sampleData_arry,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(252, 206, 86, 0.2)',
            'rgba(71, 192, 192, 0.2)',
            'rgba(2, 102, 255, 0.2)',
            'rgba(245, 159, 64, 0.2)'
          ],
          borderWidth: 3
        }]
      }
    });
  }
}
