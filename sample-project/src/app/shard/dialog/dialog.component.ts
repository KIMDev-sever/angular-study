import { Component, OnInit, Inject } from '@angular/core';

import { UtilityService } from '../utility.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VirtualTimeScheduler } from 'rxjs';
import { PlayerModel } from 'src/app/player-list/player-list.model';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  imageSrc = '../../../assets/image.png';
  reader: FileReader;
  data: PlayerModel = {
    memberId: '',
    index: 0,
    playerId: '',
    thumnail: '',
    title: ''
  };
  constructor(
    private utilityService: UtilityService,
    private matDialogRef: MatDialogRef<DialogComponent>,

  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addData(key: string, value: string) {
    this.data[key] = value;
  }

  // tslint:disable:typedef
  commitData() {
    this.matDialogRef.close(this.data);
  }

  cencel() {
    this.matDialogRef.close();
  }
  // tslint:disable-next-line:typedef
  selectFile(files: FileList): void {
    if (files && files.length > 0) {
      const file = files[0];
      // tslint:disable-next-line:no-unused-expression
      this.utilityService.imageUpload(file).then((value) => {
        // tslint:disable-next-line:no-string-literal
        if (!!value['message'] && value['message'] === 'ok') {
          this.utilityService.openSnackBar('이미지가 업로드 되였습니다.');
          this.imageSrc = 'http://localhost:3000/images/' + file.name;
          this.addData('thumnail', this.imageSrc);
        }
      });
    }
  }
}
