import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) {
  }

  async ngOnInit() {
    //console.log('ngOnInit');
    //needs a guard in case other than 4 paths is provided!!
    this.platformDetails =
      PlatformsMap[`${this._activatedRoute.snapshot.paramMap.get('id')}`];
    //console.log(this._activatedRoute);
    //console.log(this._activatedRoute.snapshot.paramMap.get('id'));
    //console.log(this.platformDetails);
    await this.initialise();
  }

  async initialise() {
    this._apiService
      .getReleaseDates(this.platformDetails.PlatformIds, this.take, this.offset)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.listOfGames.push(...data);
        //console.log(this.listOfGames);

        // Update virtual scroll when new items are pushed.
        this.listedLoadedPlacesScroll?.checkEnd(); 
        
        //console.log(data);
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

  async gameClicked(gameId) {
    //console.log(gameId);
  }

  loadMoreData(event) {
    setTimeout(async () => {
      this.offset += this.take;
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();

      //console.log(this.offset);
      await this.initialise();
      event.target.complete();

      // App logic to determine max data that can be loaded
      // and disable the infinite scroll
      if (this.listOfGames.length > 500) {
        event.target.disabled = true;
      }
    }, 420);
  }

}
