import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformId } from 'src/app/enums/platformId';
import { FilterPlatform } from 'src/app/interfaces/videogamerelease/filterPlatform';


@Component({
  selector: 'app-split-layout-menu',
  templateUrl: './split-layout-menu.page.html',
  styleUrls: ['./split-layout-menu.page.scss'],
})
export class SplitLayoutMenuPage implements OnInit {

  filterPlatforms: FilterPlatform[];
  searchTerm: string = "";

  constructor(
    private _router: Router
  ) { }

  async ngOnInit() {
    //console.log("ngOnInit")
    this.filterPlatforms = [
      { Name: 'Windows', PlatformId: PlatformId.Windows, IsChecked: true, CustomSlug: 'win' },
      { Name: 'Linux', PlatformId: PlatformId.Linux, IsChecked: true, CustomSlug: 'linux' },
      { Name: 'PlayStation 5', PlatformId: PlatformId.PS5, IsChecked: true, CustomSlug: 'ps5' },
      { Name: 'Xbox Series X', PlatformId: PlatformId.XSX, IsChecked: true, CustomSlug: 'series-x' },
      { Name: 'Nintendo Switch', PlatformId: PlatformId.NX, IsChecked: true, CustomSlug: 'switch' },
      { Name: 'Android', PlatformId: PlatformId.Android, IsChecked: true, CustomSlug: 'android' },
      { Name: 'iOS', PlatformId: PlatformId.IOS, IsChecked: true, CustomSlug: 'ios' },
    ];
    this.filterChangeEvent();
  }

  async ionViewWillEnter() {
    //console.log('ionViewWillEnter  ');
  }

  async ionViewDidEnter() {
    //console.log('ionViewDidEnter  ' );
    //this.filterChangeEvent();

  }

  async ionViewWillLeave() {
    //console.log('ionViewWillLeave  ');
  }

  async ionViewDidLeave() {
    //console.log('ionViewDidLeave  ');
  }

  async ngOnDestroy() {
    //console.log('ngOnDestroy  ');
  }

  /**
 * Opens link in new tab.
 * @param url 
 */
  goToLink(url: string) {
    window.open(url, "_blank");
  }

  filterChangeEvent() {
    setTimeout(() => {
      this._router.navigate(['/menu/games-list/'], {
        queryParams: {
          platform: this.filterPlatforms.filter(x => x.IsChecked).reduce(function (accumulator, currentValue) {
            accumulator.push(PlatformId[currentValue.PlatformId]);
            return accumulator;
          }, []),
          search: this.searchTerm,
        }
      })
    });
  }

  /**
   * On check entry (event) logic.
   */
  checkEvent(platformId: PlatformId) {
    //console.log("checkevent")
    const totalItems = this.filterPlatforms.length;
    let checked = 0;
    this.filterPlatforms.map(entry => {
      if (entry.IsChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      //console.log("at least one")
    } else if (checked == totalItems) {
      //If all are checked
      //console.log("all")
    } else {
      //If none is checked.
      //Check all others except the last unchecked.
      //console.log("none")
      this.filterPlatforms.forEach(x => {
        if (x.PlatformId != platformId) x.IsChecked = true
      });
    }
  }

}
