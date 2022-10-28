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
  platformIds: PlatformId[] = [];
  listOfGames: ReleaseDate[] = [];
  ngUnsubscribe = new Subject<void>();
  offset: number = 0;
  take: number = 25;
  dateSecondsSinceEpoch: number = 0;
  amLoadingFlag: boolean = false;
  loadingElement;
  noPlatformFilterSelected: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  async ngOnInit() {
    //console.log('ngOnInit  2');

  }

  async ionViewWillEnter() {
    //console.log('ionViewWillEnter 2 ');
  }

  async ionViewDidEnter() {

    //console.log('ionViewDidEnter 2 ');
    this._activatedRoute.queryParamMap
      .subscribe(async q => {
        if (this.queriesChanged(this.currentPlatformQueryParam, q.getAll('platform'))) {
          this.currentPlatformQueryParam = q.getAll('platform');
          await this.queriesParamsExistGuard(q.keys, this.currentPlatformQueryParam);
        }
      });
  }

  async ionViewWillLeave() {
    //console.log('ionViewWillLeave 2 ');
  }

  async ionViewDidLeave() {
    //console.log('ionViewDidLeave  2');
  }

  async ngOnDestroy() {
    //console.log('ngOnDestroy 2   ')
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    //console.log('ngOnDestroy  ' + this.platformDetails);
  }

  async queriesParamsExistGuard(keys: string[], platformQP: string[]): Promise<void> {
    //console.log("guard")
    this.offset = 0
    this.listOfGames = [];
    this.dateSecondsSinceEpoch = await this.getDateSecondsSinceEpoch(0);
    this.platformIds = [];
    this.noPlatformFilterSelected = false;

    platformQP.forEach(platform => {
      //console.log(PlatformId[platform])
      this.platformIds.push(PlatformId[platform]);
    });

    if (keys.length != 1 ||
      !keys.includes("platform") ||
      this.platformIds.includes(undefined)) {
      // Force refresh and Navigate to root
      const parsedUrl = new URL(window.location.href);
      const baseUrl = parsedUrl.origin;
      window.location.href = baseUrl;
    } else if (this.platformIds.length == 0) {
      this.noPlatformFilterSelected = true;
    }
    else {
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

  queriesChanged(a, b) {
    //console.log(a);
    //console.log(b);
    if (a == null || b == null) return true;
    if (a.length == 0 || b.length == 0) return true;
    if (a === b) return false;
    if (a.length !== b.length) return true;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return true;
    }
    return false;
  }
}
