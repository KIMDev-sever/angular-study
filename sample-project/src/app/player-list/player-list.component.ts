import { Component, OnInit , OnDestroy} from '@angular/core';
import { PlayerModel } from './player-list.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shard/dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  list: PlayerModel[];
  subscription: Subscription = new Subscription();
  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  add(): void  {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '80%',
      height: '80%'
    });

    this.subscription.add(dialogRef.afterClosed().subscribe((result: PlayerModel) => {
      const data: PlayerModel = {
        index: this.list.length,
        playerId: result.playerId,
        thumnail: result.thumnail,
        title: result.title
      };
    }));
  }

  del(): void  {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // 라이프사이클종료 및 subscribe제거;
  }

}
