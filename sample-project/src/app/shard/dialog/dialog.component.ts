import { Component, OnInit, Inject } from '@angular/core';

import { UtilityService } from '../utility.service';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  imageSrc = '../../../assets/image.png';
  reader: FileReader;
  constructor(
    private utilityService: UtilityService,
    private matDialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
  }


  // tslint:disable:typedef
  addData() {
    this.matDialogRef.close();
    // 프로미스로 구현할 예정
  }

  cencel() {
    this.matDialogRef.close();
  }
  // tslint:disable-next-line:typedef
  selectFile(files: FileList): void {
    const message = '';
    if (files && files.length > 0) {
      // For Preview
      const file = files[0];
      this.utilityService.imageUpload(file).then((value) => {

        // this.imageSrc = ;
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
