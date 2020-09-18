import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from '../../../shard/utility.service';
import { EventModel } from '../../../shard/event.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { SubCategoryModel } from 'src/app/shard/product.model';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  visible = true;
  selectable = true;
  removable = true;
  event_data: EventModel;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  key: string;
  kindlist = [
    '프로모션', '행사', '세일', '등등'
  ];
  kindSettingTrigger = false;
  @ViewChild('subInput') subInput: ElementRef<HTMLInputElement>;
  subCtrl = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, value: EventModel },
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.event_data = this.data.value;
    this.key = this.data.key;
  }

  inputData(key: string, value) {
    this.event_data[key] = value;
  }
  close(value: number) {
    const data = value > 0 ? { key: value, data: this.event_data } : null;
    this.dialogRef.close(data);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const data: string = value.trim();
      this.kindlist.push(data);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.subCtrl.setValue(null);
  }

  remove(i: number): void {

    this.kindlist.splice(i, 1);

  }
  selectFile(files: FileList, index: number): void {
    if (files && files.length > 0) {
      const file = files[0];
      // tslint:disable-next-line:no-unused-expression
      this.utilityService.imageUpload(file).then((value) => {
        // tslint:disable-next-line:no-string-literal
        if (!!value['message'] && value['message'] === 'ok') {
          this.utilityService.openSnackBar('이미지가 업로드 되였습니다.');
          this.event_data.images[index] = 'http://localhost:3000/images/' + file.name;
        }
      });
    }
  }
}
