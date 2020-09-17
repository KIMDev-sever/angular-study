import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CategoryModel, ProductModel } from '../shard/product.model';
import { v4 as uuidv4 } from 'uuid';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, } from '@angular/material/dialog';
import * as lodash from 'lodash';
import { ProductPageDialogComponent } from './product-page-dialog/product-page-dialog.component';
import { Subscription, from } from 'rxjs';
import { UtilityService } from '../shard/utility.service';
import { filter } from 'rxjs/operators';
import { ConfirmComponent } from '../shard/dialog/confirm/confirm.component';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, AfterViewInit, OnDestroy {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  // sample data
  category_list: CategoryModel[] = [];
  product_list: ProductModel[] = [];
  change_product_list: ProductModel[] = [];
  selected_Category = '';
  @ViewChild('paginator') paginator: MatPaginator;
  startsize = 0;
  endsize = 15;
  subs = new Subscription();
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private utilityService: UtilityService,
    private cd: ChangeDetectorRef
  ) { }



  ngOnInit(): void {


    this.subs.add(this.router.params.subscribe((value) => {
      if (!!value) {
        // smaple
        for (let index = 0; index < (Math.random() * 200); index++) {
          for (let no = 0; no < Math.random() * 200; no++) {
            const sample_buyList: ProductModel = {
              category_num: 'abcd12',
              code: uuidv4().substring(0, 6),
              date: new Date(),
              name: '어떠한 물건',
              count: Math.ceil(Math.random() * 100),
              price: 10000,
              sellTrigger: true,
              images: ['../../assets/image.png', '../../assets/image.png', '../../assets/image.png'],
              explan: '어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고' +
                '어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고'
            };
            this.product_list.push(sample_buyList);
          }
          const data: CategoryModel = {
            name: '카테고리' + index,
            category_num: uuidv4().substring(0, 6),
          };
          this.category_list.push(data);
        }
        // tslint:disable-next-line:radix
        this.selected_Category = value.category_num;
        this.change_product_list = this.product_list.filter((data, index) => {
          return data.category_num === this.selected_Category;
        });
        console.log(this.change_product_list);
      }
    }));
    this.cd.markForCheck();

  }
  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = '보여질 페이지수';
  }


  change_paginator(event: PageEvent) {
    // this.change_product_list= this.product_list.filter
    // Math.floor();
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
    });
    if (!!category_value) {
      this.route.navigate(['product_management', category_value.category_num]);
    }

  }
  open_dialog(value: ProductModel) {
    const sample_buyList: ProductModel = {
      category_num: this.selected_Category,
      code: uuidv4().substring(0, 6),
      date: new Date(),
      name: '',
      count: 0,
      price: 0,
      sellTrigger: false,
      images: ['../../assets/image.png', '../../assets/image.png', '../../assets/image.png'],
      explan: ''
    };
    const product = !!value ? lodash.cloneDeep(value) : sample_buyList;
    const key = !!value ? 'update' : 'insert';
    const dialogRef = this.dialog.open(ProductPageDialogComponent, {
      width: '1000px',
      height: '80%',
      data: {
        key, product
      }
    });
    let message = '';
    // tslint:disable-next-line:no-shadowed-variable
    this.subs.add(dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: { key: string, product: ProductModel }) => {
      switch (result.key) {
        case 'update': {
          const viewIndex = this.change_product_list.findIndex((data) => {
            return data.code === result.product.code;
          });
          if (viewIndex !== undefined && viewIndex !== null) {
            this.change_product_list[viewIndex].count = result.product.count;
            this.change_product_list[viewIndex].images = result.product.images;
            this.change_product_list[viewIndex].price = result.product.price;
            this.change_product_list[viewIndex].explan = result.product.explan;
            this.change_product_list[viewIndex].sellTrigger = result.product.sellTrigger;
          }
          const productIndex = this.product_list.findIndex((data) => {
            return data.code === result.product.code;
          });
          if (productIndex !== undefined && productIndex !== null) {
            this.product_list[productIndex] = result.product;
          }
          message = '상품이 수정되였습니다';
          break;

        }
        default: {
          message = '상품이 추가되었습니다.';
          this.change_product_list.push(result.product);
          this.product_list.push(result.product);
        }
      }

      // db저장추가 (dB가 성공적으로 추가되면 스넥바 메세지 발생)
      this.utilityService.openSnackBar(message);
    }));
    this.cd.markForCheck();
  }
  del(index: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: '삭제하시겠습니까?'
    });
    dialogRef.afterClosed().subscribe((trigger) => {
      // db삭제
      if (!!trigger) {
        this.change_product_list.splice(index, 1);
        this.utilityService.openSnackBar('데이터 삭제가 되었습니다.');
      }

    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
