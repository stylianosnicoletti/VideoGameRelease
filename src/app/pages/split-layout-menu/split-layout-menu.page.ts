import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-split-layout-menu',
  templateUrl: './split-layout-menu.page.html',
  styleUrls: ['./split-layout-menu.page.scss'],
})
export class SplitLayoutMenuPage implements OnInit {
 
  public appPages = [
    { title: 'All', url: '/menu/games-list/All', icon: 'assets/platform-icons/All.svg', theme: 'platform_theme_all' },
    { title: 'Windows', url: '/menu/games-list/Windows', icon: 'assets/platform-icons/win.svg', theme: 'platform_theme' },
    { title: 'Linux', url: '/menu/games-list/Linux', icon: 'assets/platform-icons/linux.svg', theme: 'platform_theme' },
    { title: 'PlayStation 5', url: '/menu/games-list/PS5', icon: 'assets/platform-icons/ps5.svg', theme: 'platform_theme' },
    { title: 'Xbox Series X', url: '/menu/games-list/XSX', icon: 'assets/platform-icons/series-x.svg', theme: 'platform_theme' },
    { title: 'Nintendo Switch', url: '/menu/games-list/NX', icon: 'assets/platform-icons/switch.svg', theme: 'platform_theme' },
    { title: 'Android', url: '/menu/games-list/Android', icon: 'assets/platform-icons/android.svg', theme: 'platform_theme' },
    { title: 'iOS', url: '/menu/games-list/IOS', icon: 'assets/platform-icons/ios.svg', theme: 'platform_theme' },
  ];
 

  constructor(
  ) { }

  async ngOnInit() {
    //console.log("here i am")
  }

  async ionViewWillEnter() {
    //await this.getListData();
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

    //console.log('ngOnDestroy  ' + this.platformDetails);
  }

    /**
   * Opens link in new tab.
   * @param url 
   */
     goToLink(url: string) {
      window.open(url, "_blank");
    }

 
}
