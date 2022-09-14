import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformsMap } from '../constants/platformsMap';
import { PlatformDetails } from '../interfaces/platformDetails';
import { ReleaseDate } from '../interfaces/igdb/releaseDate';
import { ApiService } from '../services/api.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage implements OnInit {
  platformDetails: PlatformDetails;
  listOfGames: ReleaseDate[] = [];
  ngUnsubscribe = new Subject<void>();
  offset: number = 0;
  take: number = 20;

  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) {}

  async ngOnInit() {
    await this.platformExistGuard();
  }

  async ionViewWillEnter() {
    await this.getListData();
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

  async platformExistGuard(): Promise<void> {
    this.platformDetails =
      PlatformsMap[`${this._activatedRoute.snapshot.paramMap.get('id')}`];
    if (this.platformDetails === undefined) {
      this._router.navigate(['']);
    }
  }

  async getListData() {
    await (await this._apiService
      .getReleaseDates(this.platformDetails.PlatformIds, this.take, this.offset))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (data) => {
        //console.log(data);
        await this.listOfGames.push(...data);
        this.listOfGames = [...this.listOfGames]; // this is required to update new data on html.
        //console.log(this.listOfGames);
      });
  }

  async gameClicked(gameId) {
    //console.log(gameId);
  }

  async loadMoreData(event) {
    this.offset += this.take;
    await this.ngUnsubscribe.next();
    await this.ngUnsubscribe.complete();
    await this.getListData();
    await event.target.complete();

  }

  async goToInstagramLink() {
    window.location.href = 'https://www.instagram.com/video_game_release';
  }

  async doRefresh(){
    await this.ngUnsubscribe.next();
    await this.ngUnsubscribe.complete();
    this.offset = 0
    this.listOfGames = [];
    await this.getListData();
  }
}
