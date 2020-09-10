import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryModel, ProductModel } from '../shard/product.model';
import { v4 as uuidv4 } from 'uuid';
import { MatTab, MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {
  // sample data
  category_list: CategoryModel[] = [];
  product_list: ProductModel[] = [];
  change_product_list: ProductModel[] = []
  selected_Category = 0;
  constructor() { }

  ngOnInit(): void {
    //smaple 
    for (let index = 0; index < (Math.random() * 200); index++) {
      for (let no = 0; no < Math.random() * 200; no++) {
        const sample_buyList: ProductModel = {
          category_num: index,
          id: uuidv4().substring(0, 6),
          date: new Date(),
          name: '어떠한 물건',
          count: Math.ceil(Math.random() * 100),
          price: 10000,
          images: ['../../assets/image.png','../../assets/image.png','../../assets/image.png']
        };
        this.product_list.push(sample_buyList);
      }
      const data: CategoryModel = {
        name: '카테고리' + index,
        category_num: index
      };
      this.category_list.push(data);
    }
    this.change_product_list = this.product_list.filter(data => {
      return data.category_num === this.selected_Category;
    })
  }
  change_category(value: MatTabChangeEvent) {
    this.change_product_list = [];
    const label = value.tab.textLabel;
    const category_value = this.category_list.find((data) => {
      return data.name === label;
    })
    if (!!category_value) {
      this.selected_Category = category_value.category_num;
      this.change_product_list = this.product_list.filter(data => {
        return data.category_num === this.selected_Category;
      })
    }
  }

}
