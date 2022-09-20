import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-split-layout',
  templateUrl: './split-layout.page.html',
  styleUrls: ['./split-layout.page.scss'],
})
export class SplitLayoutPage implements OnInit {
 
  public appPages = [
    { title: 'All', url: '/menu/platforms/All', icon: 'assets/platform-icons/All.svg', theme: 'platform_theme_all' },
    { title: 'Windows', url: '/menu/platforms/Windows', icon: 'assets/platform-icons/win.svg', theme: 'platform_theme' },
    { title: 'Linux', url: '/menu/platforms/Linux', icon: 'assets/platform-icons/linux.svg', theme: 'platform_theme' },
    { title: 'Stadia', url: '/menu/platforms/Stadia', icon: 'assets/platform-icons/stadia.svg', theme: 'platform_theme' },
    { title: 'PlayStation 5', url: '/menu/platforms/PS5', icon: 'assets/platform-icons/ps5.svg', theme: 'platform_theme' },
    { title: 'Xbox Series X', url: '/menu/platforms/XSX', icon: 'assets/platform-icons/series-x.svg', theme: 'platform_theme' },
    { title: 'Nintendo Switch', url: '/menu/platforms/NX', icon: 'assets/platform-icons/switch.svg', theme: 'platform_theme' },
    { title: 'Android', url: '/menu/platforms/Android', icon: 'assets/platform-icons/android.svg', theme: 'platform_theme' },
    { title: 'iOS', url: '/menu/platforms/IOS', icon: 'assets/platform-icons/ios.svg', theme: 'platform_theme' },
  ];
 

  constructor(
  ) { }

  async ngOnInit() {
    console.log("here i am")
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

 
}
