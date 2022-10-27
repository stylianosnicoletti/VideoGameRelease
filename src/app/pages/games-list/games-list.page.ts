import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReleaseDate } from '../../interfaces/igdb/releaseDate';
import { ApiService } from '../../services/api.service';
import { PlatformId } from 'src/app/enums/platformId';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.page.html',
  styleUrls: ['./games-list.page.scss'],
})
export class GamesListPage implements OnInit {

  currentPlatformQueryParam: string[] = [];
  currentGenreQueryParam: string[] = [];
  platformIds: PlatformId[] = [];
  listOfGames: ReleaseDate[] = [];
  ngUnsubscribe = new Subject<void>();
  offset: number = 0;
  take: number = 25;
  dateSecondsSinceEpoch: number = 0;
  amLoadingFlag: boolean = false;
  loadingElement;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  async ngOnInit() {
    //console.log('ngOnInit  ');
    this._activatedRoute.queryParamMap
      .subscribe(async q => {
        if (this.currentPlatformQueryParam != q.getAll('platform') ||
          this.currentGenreQueryParam != q.getAll('genre')) {
          this.currentPlatformQueryParam = q.getAll('platform');
          this.currentGenreQueryParam = q.getAll('genre');
          await this.queriesParamsExistGuard(q.keys, this.currentPlatformQueryParam, this.currentGenreQueryParam);
        }
      });
  }

  async ionViewWillEnter() {
    //console.log('ionViewWillEnter  ');
  }

  async ionViewDidEnter() {
    //console.log('ionViewDidEnter  ');
  }

  async ionViewWillLeave() {
    //console.log('ionViewWillLeave  ');
  }

  async ionViewDidLeave() {
    //console.log('ionViewDidLeave  ');
  }

  async ngOnDestroy() {
    //console.log('ngOnDestroy    ')
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    //console.log('ngOnDestroy  ' + this.platformDetails);
  }

  async queriesParamsExistGuard(keys: string[], platformQP: string[], genreQP: string[]): Promise<void> {
    this.offset = 0
    this.listOfGames = [];
    this.dateSecondsSinceEpoch = await this.getDateSecondsSinceEpoch(0);
    this.platformIds = [];

    platformQP.forEach(platform => {
      //console.log(PlatformId[platform])
      this.platformIds.push(PlatformId[platform]);
    });

    //do same for genre

    if (keys.length != 2 ||
        !keys.includes("platform") ||
        !keys.includes("genre") ||
        this.platformIds.length == 0 || this.platformIds.includes(undefined)) {
      await this.reNavigateWithDefaultQueryParams();

      //do same for genre

    } else {
      await this.getListData();
    }
  }

  async getListData(event?) {
    //console.log(this.platformIds);
    await (await this._apiService
      .getReleaseDatesAscendingAsync(this.platformIds, this.take, this.offset, this.dateSecondsSinceEpoch))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (data) => {
        //console.log(data);
        const tempList: ReleaseDate[] = [];
        // Remove last element from current list to combine with newly fetched data in case of more than one platforms for that entry.
        const lastItem: ReleaseDate = this.listOfGames.pop();
        //console.log(lastIndex);
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
        event?.target.complete();
      });
  }

  async gameClicked(gameId) {
    await this._router.navigate([
      "/game/" + gameId,
    ]);
  }

  async getNextBatch(event) {
    //console.log("Get moreee")
    this.offset += this.take;
    await this.ngUnsubscribe.next();
    await this.ngUnsubscribe.complete();
    await this.getListData(event);
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

  trackByIdx(i) {
    return i;
  }

  async prepareDistinctMultiPlatformDataAsync(list: ReleaseDate[]): Promise<ReleaseDate[]> {
    var temporaryMap = {};
    var distinctItemList = list.reduce(function (r, o) {
      o.customMultiPlatformFoundSlugs = new Set();
      o.customMultiPlatformFoundSlugs.add(o.platform.slug);
      var key = o.game.id + '-' + o.date; // with key the game id and date.

      if (!temporaryMap[key]) {
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

  async reNavigateWithDefaultQueryParams() {
    this._router.navigate(['/menu/games-list'], {
      queryParams: {
        platform: ["Windows", "Linux", "PS5", "XSX", "NX", "Android", "IOS"],
        genre: ["aa"],
      }
    });
  }


}
