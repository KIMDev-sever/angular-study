import { Component, OnInit, Inject } from '@angular/core';
import { UtilityService } from '../../utility.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.message = this.data;
  }
  // tslint:disable-next-line:typedef
  sendTrigger(trigger: boolean) {
    this.dialogRef.close(trigger);
  }
}
