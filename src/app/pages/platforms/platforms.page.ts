import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformsMap } from '../../constants/platformsMap';
import { PlatformDetails } from '../../interfaces/platformDetails';
import { ReleaseDate } from '../../interfaces/igdb/releaseDate';
import { ApiService } from '../../services/api.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage implements OnInit {
 
  @ViewChild(CdkVirtualScrollViewport)

  viewport: CdkVirtualScrollViewport;
  platformDetails: PlatformDetails;
  listOfGames: ReleaseDate[] = [];
  ngUnsubscribe = new Subject<void>();
  offset: number = 0;
  take: number = 25;
  dateSecondsSinceEpoch: number = 0;
  amLoadingFlag: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  async ngOnInit() {
    console.log('ngOnInit  ' + this.platformDetails);
    await this.platformExistGuard();
    this.dateSecondsSinceEpoch = await this.getDateSecondsSinceEpoch(0);
  }

  async ionViewWillEnter() {
    this.getListData();
    //await this.getListData();
    console.log('ionViewWillEnter  ' + this.platformDetails);
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
    if (this.platformDetails.Title == 'All') {
      await (await this._apiService
        .getMultiPlatformUpComingReleaseDatesAscendingAsync(this.platformDetails.PlatformIds, this.take, this.offset, this.dateSecondsSinceEpoch))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(async (data) => {   
          //console.log(data);
          const tempList: ReleaseDate[] = [];
          // Remove last element from current list to combine with newly fetched data in case of more than one platforms for that entry.
          const lastItem: ReleaseDate = this.listOfGames.pop();
          if (lastItem !== undefined) {
            tempList.push(lastItem);
          }
          tempList.push(...data);
          //console.log(tempList);

          var distinctItemList = await this.prepareDistinctMultiPlatformDataAsync(tempList);       
          //console.log(distinctItemList);

          await this.listOfGames.push(...distinctItemList);
          this.listOfGames = [...this.listOfGames]; // this is required to update new data on html.
          //console.log(this.listOfGames);

          this.amLoadingFlag = false;
        })
    } else {
      await (await this._apiService
        .getSinglePlatformUpComingReleaseDatesAscendingAsync(this.platformDetails.PlatformIds, this.take, this.offset, this.dateSecondsSinceEpoch))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(async (data) => {
          //console.log(data);
          await this.listOfGames.push(...data);
          this.listOfGames = [...this.listOfGames]; // this is required to update new data on html.
          //console.log(this.listOfGames);
          this.amLoadingFlag = false;

        })
    }
    ;
  }

  async gameClicked(gameId, gameUrl) {
    //console.log(gameUrl);
    //window.location.href = gameUrl;
    await this._router.navigate([
      "/game/" + gameId,
    ]);
    //this._router.navigate("game",gameId);
  }

  async getNextBatch(event){
    //console.log(event);
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end === total && !this.amLoadingFlag){
      this.amLoadingFlag = true;
      this.offset += this.take;
      //this.loadMoreBehaviour.next(event);
      
      await this.ngUnsubscribe.next();
      await this.ngUnsubscribe.complete();
      await this.getListData();
    }
    //console.log(this.viewport.getDataLength());
  }


  async goToInstagramLink() {
    window.location.href = 'https://www.instagram.com/video_game_release';
  }

  async doRefresh() {
    await this.ngUnsubscribe.next();
    await this.ngUnsubscribe.complete();
    this.offset = 0
    this.listOfGames = [];
    this.dateSecondsSinceEpoch = await this.getDateSecondsSinceEpoch(0);
    await this.getListData();
  }

  async getDateSecondsSinceEpoch(dayOffsetToday: number): Promise<number> {
    const now = new Date();
    const dateToReturn = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffsetToday);
    dateToReturn.setHours(0, 0, 0, 0);
    const secondsSinceEpoch = Math.round(dateToReturn.getTime() / 1000);
    return secondsSinceEpoch;
  }

  trackByIdx(i){
    return i;
  }

  async prepareDistinctMultiPlatformDataAsync(list: ReleaseDate[]): Promise<ReleaseDate[]>{
    var temporaryMap = {};
    var distinctItemList = list.reduce(function(r, o) {
      o.customMultiPlatformFoundSlugs = new Set();
      o.customMultiPlatformFoundSlugs.add(o.platform.slug);
      var key = o.game.id + '-' + o.date; // with key the game id and date.
      
      if(!temporaryMap[key]) {
        temporaryMap[key] = Object.assign({}, o); // create a copy of o
        r.push(temporaryMap[key]);
      } else {
        temporaryMap[key].customMultiPlatformFoundSlugs.add(o.platform.slug);
      }

      return r;
    }, []);
    //console.log(distinctItemList);
    return distinctItemList;
  }
}