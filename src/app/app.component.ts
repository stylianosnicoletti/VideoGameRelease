import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'All', url: '/categories/All' },
    { title: 'PC', url: '/categories/PC', icon: "assets/icon/pc.svg" },
    { title: 'PlayStation', url: '/categories/PlayStation', icon: "assets/icon/playstation.svg" },
    { title: 'Xbox', url: '/categories/Xbox', icon: "assets/icon/xbox.svg" },
    { title: 'Nintendo', url: '/categories/Nintendo', icon: "assets/icon/nintendo.svg" },
  ];
  constructor() {}
}
