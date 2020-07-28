import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  imageSrc:string="../../../assets/image.png";
  reader:FileReader ;
  constructor() { }
  
  ngOnInit(): void {
  }
  selectFile(files: FileList){
    if (files && files.length > 0) {
      // For Preview
      const file = files[0];
      
    }
  }
}
