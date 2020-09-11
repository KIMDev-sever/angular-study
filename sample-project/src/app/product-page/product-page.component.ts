import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryModel, ProductModel } from '../shard/product.model';
import { v4 as uuidv4 } from 'uuid';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit, AfterViewInit {
  // sample data
  category_list: CategoryModel[] = [];
  product_list: ProductModel[] = [];
  change_product_list: ProductModel[] = []
  selected_Category = 0;
  @ViewChild('paginator') paginator: MatPaginator;
  startsize = 0;
  endsize = 15;
  constructor(
    private router: ActivatedRoute,
    private route:Router
  ) { }


  ngOnInit(): void {


    this.router.params.subscribe((value) => {
      if (!!value) {
        //smaple 
        for (let index = 0; index < (Math.random() * 200); index++) {
          for (let no = 0; no < Math.random() * 200; no++) {
            const sample_buyList: ProductModel = {
              category_num: index,
              code: uuidv4().substring(0, 6),
              date: new Date(),
              name: '어떠한 물건',
              count: Math.ceil(Math.random() * 100),
              price: 10000,
              images: ['../../assets/image.png', '../../assets/image.png', '../../assets/image.png'],
              explan: '어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고' +
                '어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고'
            };
            this.product_list.push(sample_buyList);
          }
          const data: CategoryModel = {
            name: '카테고리' + index,
            category_num: index
          };
          this.category_list.push(data);
        }
        this.selected_Category = Number.parseInt(value['category_num']);
        this.change_product_list = this.product_list.filter((data, index) => {
          return data.category_num === this.selected_Category;
        })
        console.log( this.change_product_list);
      }
    });


  }
  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = '보여질 페이지수';
  }
  change_paginator(event: PageEvent) {
    // this.change_product_list= this.product_list.filter
    // Math.floor() 
    this.endsize = event.pageSize * (event.pageIndex + 1);
    if (event.pageIndex === 0) {
      this.startsize = 0;
    } else {
      this.startsize = this.endsize - event.pageSize;
    }

  }
  change_category(value: MatTabChangeEvent) {
    this.change_product_list = [];
    const label = value.tab.textLabel;
    const category_value = this.category_list.find((data) => {
      return data.name === label;
    })
    if (!!category_value) {
      this.route.navigate(['product_management',category_value.category_num]);
    }
  }

}
