import { Component, OnInit } from '@angular/core';
import { PlayerModel } from './player-list.model';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../shard/dialog/dialog.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  list : PlayerModel[];
  constructor(
    private dialog: MatDialog
  ) {

   }

  ngOnInit(): void {
  }
  add(){
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe((result:PlayerModel) => {
      let data:PlayerModel={
        index:this.list.length,
        playerId:result.playerId,
        thumnail:result.thumnail,
        title:result.title
      }
    }).unsubscribe();
  }
  del(){

  }
}
