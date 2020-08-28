import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // tslint:disable:typedef

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  move_page(value: string) {
    this.route.navigate([value]);
  }

}
