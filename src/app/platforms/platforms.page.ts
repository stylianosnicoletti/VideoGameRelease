import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonVirtualScroll } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformsMap } from '../constants/platformsMap';
import { PlatformDetails } from '../interfaces/platformDetails';
import { ReleaseDate } from '../interfaces/igdb/releaseDate';
import { ApiService } from '../services/api.service';

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

  @ViewChild('listedLoadedPlacesScroll') listedLoadedPlacesScroll: IonVirtualScroll;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) { }

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
      this._router.navigate([""]);
    }
  }

  async getListData() {
    this._apiService
      .getReleaseDates(this.platformDetails.PlatformIds, this.take, this.offset)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        //console.log(data);
        this.listOfGames.push(...data);
        //console.log(this.listOfGames);
        // Update virtual scroll when new items are pushed.
        this.listedLoadedPlacesScroll?.checkEnd();
      });
  }

  async gameClicked(gameId) {
    //console.log(gameId);
  }

  loadMoreData(event) {
    setTimeout(async () => {
      // Increment offset for querying next data.
      this.offset += this.take;

      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();

      //console.log(this.offset);
      await this.getListData();
      event.target.complete();

      // App logic to determine max data that can be loaded
      // and disable the infinite scroll
      if (this.listOfGames.length > 500) {
        event.target.disabled = true;
      }
    }, 420);
  }

}
