import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Game } from '../interfaces/game';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: string;
  listOfGames: Game[];
  listOfSubscriptions: Subscription[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
  ) {}

  async ngOnInit() {
    console.log('ngOnInit');
    //needs a guard in case other than 4 paths is provided!!
    this.categories = this._activatedRoute.snapshot.paramMap.get('id');
    //console.log(this.activatedRoute.snapshot.paramMap);
    this.listOfSubscriptions.push(
      this._apiService.getGames()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.listOfGames = data;
        this.listOfGames.forEach((game) => {
          //console.log(game.name);
        });
      })
    );
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter  ' + this.categories);
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter  ' + this.categories);
  }

  async ionViewWillLeave() {
    console.log('ionViewWillLeave  ' + this.categories);
  }

  async ionViewDidLeave() {
    console.log('ionViewDidLeave  ' + this.categories);
  }

  async ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    console.log('ngOnDestroy  ' + this.categories);
  }

  async gameClicked(event) {
    console.log(event);
  }
}
