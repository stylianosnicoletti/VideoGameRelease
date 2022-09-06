import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'All', url: '/categories/All', icon: 'assets/icon/all.svg', theme: 'category_theme_all'},
    { title: 'PC', url: '/categories/PC', icon: 'assets/icon/pc.svg', theme: 'category_theme_pc' },
    { title: 'PlayStation', url: '/categories/PlayStation', icon: 'assets/icon/playstation.svg', theme: 'category_theme_playstation' },
    { title: 'Xbox', url: '/categories/Xbox', icon: 'assets/icon/xbox.svg', theme: 'category_theme_xbox' },
    { title: 'Nintendo', url: '/categories/Nintendo', icon: 'assets/icon/nintendo.svg', theme: 'category_theme_nintendo' },
  ];
  constructor() {
    this.initializeApplication();
  }

  initializeApplication(){
    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    const analytics = getAnalytics(app);
  }
}
