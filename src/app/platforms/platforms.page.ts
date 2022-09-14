import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformsMap } from '../constants/platformsMap';
import { PlatformDetails } from '../interfaces/platformDetails';
import { ReleaseDate } from '../interfaces/igdb/releaseDate';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
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
    private _apiService: ApiService,
    private _loadingService: LoadingService
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
        console.log(this.listOfGames);
        // Update virtual scroll when new items are pushed.
        //this.listedLoadedPlacesScroll?.checkEnd();
      });
  }

  async gameClicked(gameId) {
    //console.log(gameId);
  }

  /*loadMoreData(event) {
    setTimeout(async () => {
      // Increment offset for querying next data.
      this.offset += this.take;

      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();

      console.log('xxxx' + this.offset);
      await this.getListData();
      event.target.complete();

      // App logic to determine max data that can be loaded
      // and disable the infinite scroll
      if (this.listOfGames.length > 500) {
        event.target.disabled = true;
      }
    }, 500);
  }*/

  async goToInstagramLink() {
    window.location.href = 'https://www.instagram.com/video_game_release';
  }

  async loadMoreData2(event) {
    console.log(this.cdkVirtualScrollViewport.getDataLength());
    let index: number = event;
    console.log(index + "   vs   " + ((this.offset +this.take)* 1));
    if (index >= (this.offset +this.take)* 1) {
      console.log("YES:  " + index + "   vs   " + ((this.offset +this.take)* 1));
      // Increment offset for querying next data.
      //console.log('offset before:' + this.offset);
      this.offset += this.take;
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
      //console.log('offset after:' + this.offset);

      var loadingElement = await this._loadingService.createAndPresentLoading(
        'Loading..'
      );
      await this.getListData();
      await this._loadingService.dismissLoading(loadingElement); 
      await console.log("scrolling to:  " + index);
      await this.cdkVirtualScrollViewport.scrollToIndex(0, "smooth");
    }
  }
}
