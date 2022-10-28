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

  isIndeterminate: boolean = false;
  masterCheck: boolean = true;
  filterPlatforms: FilterPlatform[];

  constructor(
    private _router: Router
  ) { }

  async ngOnInit() {
    //console.log("ngOnInit")
    this.filterPlatforms = [
      { Name: 'Windows', PlatformId: PlatformId.Windows, IsChecked: true, CustomSlug: 'win' },
      { Name: 'Linux', PlatformId: PlatformId.Linux, IsChecked: true , CustomSlug: 'linux' },
      { Name: 'PlayStation 5', PlatformId: PlatformId.PS5, IsChecked: true , CustomSlug: 'ps5' },
      { Name: 'Xbox Series X', PlatformId: PlatformId.XSX, IsChecked: true , CustomSlug: 'series-x' },
      { Name: 'Nintendo Switch', PlatformId: PlatformId.NX, IsChecked: true , CustomSlug: 'switch' },
      { Name: 'Android', PlatformId: PlatformId.Android, IsChecked: true , CustomSlug: 'android' },
      { Name: 'iOS', PlatformId: PlatformId.IOS, IsChecked: true , CustomSlug: 'ios' },
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
          //genre: ["All"]
        }
      })
    });
  }


  /**
   * For Master CheckBox.
   */
  checkMaster() {
    setTimeout(() => {
      this.filterPlatforms.forEach(entry => {
        entry.IsChecked = this.masterCheck;
      });
      this.filterChangeEvent();
    });
  }

  /**
   * On check entry (event) logic.
   */
  checkEvent() {
    //console.log("checkevent")
    const totalItems = this.filterPlatforms.length;
    let checked = 0;
    this.filterPlatforms.map(entry => {
      if (entry.IsChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

}
