import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlayerModel } from './player-list.model';
import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../shard/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { UtilityService } from '../shard/utility.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  list: PlayerModel[] = [];
  subscription: Subscription = new Subscription();


  constructor(
    private dialog: MatDialog,
    private utilityService: UtilityService,
  ) {

  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  // add(): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '80%',
  //     height: '80%'
  //   });

  //   this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: PlayerModel) => {
  //     if (!!result) {
  //       const data: PlayerModel = { ...result };
  //       this.list.push(data);
  //       data.index = this.list.length;
  //       // 데이터 베이스 처리는 나중에 함
  //     }

  //   }));
  // }
  // tslint:disable-next-line:typedef
  playVideo(videoId: string) {
    this.utilityService.setStringdata(videoId);
  }
  del(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // 라이프사이클종료 및 subscribe제거;
  }

}
