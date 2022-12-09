import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Website } from 'src/app/interfaces/igdb/website';
import { Game } from '../../interfaces/igdb/game';
import { ApiService } from '../../services/api.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameDetails: Game;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  async ngOnInit() {
    //console.log("ngOnInit!!")
    await this.gameExistGuard();
  }

  async ionViewWillEnter() {
    //console.log('ionViewWillEnter  ');
  }

  async ionViewDidEnter() {
    // console.log('ionViewDidEnter');
  }

  async ionViewWillLeave() {
    //console.log('ionViewWillLeave  ');
  }

  async ionViewDidLeave() {
    //console.log('ionViewDidLeave  ');
  }

  async ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    //console.log('ngOnDestroy  ');
  }

  async gameExistGuard(): Promise<void> {
    const gameId: String = this._activatedRoute.snapshot.paramMap.get('id')
    await (await this._apiService
      .getGameAsync(gameId))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (data) => {
        //console.log(data[0]);
        if (data.length == 0 || data[0]?.id?.toString() != gameId) {
          this._router.navigate(['']);
        }
        this.gameDetails = data[0];
        this.gameDetails.websites = this.gameDetails?.websites?.filter(this.getOnlyTrustedWebSites);
        //console.log(this.gameDetails.name);
      })
  }

  /**
   * Opens link in new tab.
   * @param url 
   */
  goToLink(url: string) {
    window.open(url, "_blank");
  }

  /**
   * Returns website if it is trusted.
   * @param website 
   * @returns 
   */
  getOnlyTrustedWebSites(website: Website){
    if(website.trusted){
      return website;
    }
  }

  async share(){
    await Share.share({
      title: this.gameDetails?.name,
      url: window.location.href,
    });
  }

}
