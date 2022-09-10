import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformId } from '../enums/platformId';
import { Game } from '../interfaces/game';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage implements OnInit {
  platforms: string;
  listOfGames: Game[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
  ) { }

  async ngOnInit() {
    console.log('ngOnInit');
    //needs a guard in case other than 4 paths is provided!!
    this.platforms = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this._activatedRoute);
    await this.initialise();
  }

  async initialise() {
    this._apiService.getGames([])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.listOfGames = [ ...this.listOfGames, ...data];
        this.listOfGames.forEach((game) => {
          //console.log(game.name);
        });
      });
      this._apiService.getReleaseDates([PlatformId.Android],0,0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
          console.log(data);
      });
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter  ' + this.platforms);
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter  ' + this.platforms);
  }

  async ionViewWillLeave() {
    console.log('ionViewWillLeave  ' + this.platforms);
  }

  async ionViewDidLeave() {
    console.log('ionViewDidLeave  ' + this.platforms);
  }

  async ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    console.log('ngOnDestroy  ' + this.platforms);
  }

  async gameClicked(event) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    console.log(event)
    this.initialise();


      ;
  }
}
