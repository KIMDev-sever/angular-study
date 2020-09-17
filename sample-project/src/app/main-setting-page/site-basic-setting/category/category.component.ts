import { Component, OnInit } from '@angular/core';
import { CategoryModel, SubCategoryModel } from '../../../shard/product.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmComponent } from '../../../shard/dialog/confirm/confirm.component';
import { UtilityService } from '../../../shard/utility.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  category_List: CategoryModel[] = [];
  constructor(
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) { }
  ngOnInit(): void {
    // sample
    for (let index = 0; index < (Math.random() * 20) + 4; index++) {
      const data: CategoryModel = {
        name: '카테고리' + (index + 1),
        category_num: uuidv4().substring(0, 6),
        sub_category: []
      };
      for (let index2 = 0; index2 < (Math.random() * 5); index2++) {
        const sub_category: SubCategoryModel = {
          name: '서브카테고리',
          sub_category_num: uuidv4().substring(0, 6),
        };
        data.sub_category.push(sub_category);
      }
      this.category_List.push(data);
    }
  }
  del(name: string, index: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: name
        + '을 삭제하시겠습니까?'
    });
    dialogRef.afterClosed().subscribe((trigger) => {
      // db삭제
      if (!!trigger) {
        this.category_List.splice(index, 1);
        this.utilityService.openSnackBar('데이터 삭제가 되었습니다.');
      }

    });

  }
  openDialog(value: CategoryModel) {
    const newModel: CategoryModel = {
      category_num: uuidv4().substring(0, 6),
      name: '',
      sub_category: []
    };
    const dataModel = !!value ? value : newModel;
    console.log(dataModel);
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: dataModel
    });
    dialogRef.afterClosed().subscribe((result: CategoryModel) => {
      if (!!result) {
        const index = this.category_List.findIndex((category) => {
          return category.category_num === value.category_num;
        });
        if (index !== null && index !== undefined) {
          this.category_List[index] = result;
        }
      }
    });
  }
}
