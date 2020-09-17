import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryModel, SubCategoryModel } from '../../../../shard/product.model';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { v4 as uuidv4 } from 'uuid';
import * as loadsh from 'lodash';
@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  category_model: CategoryModel;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  subCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  @ViewChild('subInput') subInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryModel
  ) {

  }

  ngOnInit(): void {
    this.category_model = loadsh.cloneDeep(this.data);

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const data: SubCategoryModel = {
        name: value.trim(),
        sub_category_num: uuidv4().substring(0, 6)
      };
      this.category_model.sub_category.push(data);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.subCtrl.setValue(null);
  }

  remove(i: number): void {

    this.category_model.sub_category.splice(i, 1);

  }
  close(trigger: boolean) {
    const data = trigger ? this.category_model : null;
    this.dialogRef.close(data);
  }
}
