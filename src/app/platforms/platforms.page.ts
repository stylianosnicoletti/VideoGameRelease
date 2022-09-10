import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformsMap } from '../constants/platformsMap';
import { PlatformId } from '../enums/platformId';
import { Game } from '../interfaces/game';
import { PlatformDetails } from '../interfaces/platformDetails';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage implements OnInit {
  platformDetails: PlatformDetails;
  listOfGames: any[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
  ) { }

  async ngOnInit() {
    console.log('ngOnInit');
    //needs a guard in case other than 4 paths is provided!!
    this.platformDetails = PlatformsMap[`${this._activatedRoute.snapshot.paramMap.get('id')}`];
    console.log(this._activatedRoute);
    console.log(this._activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.platformDetails);
    await this.initialise();
  }

  async initialise() {
    //this._apiService.getGames([])
     // .pipe(takeUntil(this.ngUnsubscribe))
     // .subscribe((data) => {
      //  this.listOfGames = [ ...this.listOfGames, ...data];
      //  this.listOfGames.forEach((game) => {
          //console.log(game.name);
      //  });
      //});
      this._apiService.getReleaseDates(this.platformDetails.PlatformIds,0,0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
          this.listOfGames = [ ...this.listOfGames, ...data];
          console.log(data);
      });
  }

  async ionViewWillEnter() {
    //console.log('ionViewWillEnter  ' + this.platformDetails);
  }

  async ionViewDidEnter() {
    //console.log('ionViewDidEnter  ' + this.platformDetails);
  }

  async ionViewWillLeave() {
    //console.log('ionViewWillLeave  ' + this.platformDetails);
  }

  async ionViewDidLeave() {
    //console.log('ionViewDidLeave  ' + this.platformDetails);
  }

  async ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    //console.log('ngOnDestroy  ' + this.platformDetails);
  }

  async gameClicked(event) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    console.log(event)
    this.initialise();


      ;
  }
}
