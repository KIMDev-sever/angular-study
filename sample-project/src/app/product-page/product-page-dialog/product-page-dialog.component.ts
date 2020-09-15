import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel, CategoryModel } from '../../shard/product.model';
import { UtilityService } from '../../shard/utility.service';
@Component({
  selector: 'app-product-page-dialog',
  templateUrl: './product-page-dialog.component.html',
  styleUrls: ['./product-page-dialog.component.scss']
})
export class ProductPageDialogComponent implements OnInit {
  // tslint:disable:typedef
  key: string;
  product: ProductModel;
  previewImageSrc = '';
  // tslint:disable-next-line:variable-name
  category_list: CategoryModel[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProductPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, product: ProductModel },
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.key = this.data.key;
    this.product = this.data.product;
    for (let index = 0; index < (Math.random() * 200); index++) {
      const data: CategoryModel = {
        name: '카테고리' + index,
        category_num: index
      };
      this.category_list.push(data);
    }
  }
  inputdata(key: string, value) {
    this.product[key] = value;
  }
  close(value: boolean) {
    if (!value) {
      this.data = null;
    }else{
      this.data.product = this.product;
    }
    this.dialogRef.close(this.data);
  }
  selectFile(files: FileList, index: number): void {
    if (files && files.length > 0) {
      const file = files[0];
      // tslint:disable-next-line:no-unused-expression
      this.utilityService.imageUpload(file).then((value) => {
        // tslint:disable-next-line:no-string-literal
        if (!!value['message'] && value['message'] === 'ok') {
          this.utilityService.openSnackBar('이미지가 업로드 되였습니다.');
          this.product.images[index] = 'http://localhost:3000/images/' + file.name;
        }
      });
    }
  }
}
