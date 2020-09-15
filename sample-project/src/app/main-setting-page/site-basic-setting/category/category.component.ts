import { Component, OnInit } from '@angular/core';
import { CategoryModel, SubCategoryModel } from 'src/app/shard/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // tslint:disable:variable-name
  category_List: CategoryModel[] = [];
  constructor() { }

  ngOnInit(): void {
    // sample
    for (let index = 0; index < (Math.random() * 20) + 4; index++) {
      const data: CategoryModel = {
        name: '카테고리' + (index + 1),
        category_num: index,
        sub_category: []
      };
      for (let index2 = 0; index2 < (Math.random() * 5); index2++) {
        const sub_category: SubCategoryModel = {
          name: '서브카테고리',
          sub_category_num: Math.random() * 100
        };
        data.sub_category.push(sub_category);
      }
      this.category_List.push(data);
    }
  }

}
