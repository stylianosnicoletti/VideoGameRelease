import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../environments/environment';
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  NgcCookieConsentService,
  NgcNoCookieLawEvent,
  NgcInitializeEvent,
  NgcStatusChangeEvent,
} from "ngx-cookieconsent";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  public appPages = [
    { title: 'All', url: '/platforms/All', icon: 'assets/platform-icons/All.svg', theme: 'platform_theme_all' },

    { title: 'Windows', url: '/platforms/Windows', icon: 'assets/platform-icons/win.svg', theme: 'platform_theme' },
    { title: 'Linux', url: '/platforms/Linux', icon: 'assets/platform-icons/linux.svg', theme: 'platform_theme' },
    { title: 'Stadia', url: '/platforms/Stadia', icon: 'assets/platform-icons/stadia.svg', theme: 'platform_theme' },

    { title: 'PlayStation 5', url: '/platforms/PS5', icon: 'assets/platform-icons/ps5.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 4', url: '/platforms/PS4', icon: 'assets/platform-icons/PS4.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 3', url: '/platforms/PS3', icon: 'assets/platform-icons/PS3.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 2', url: '/platforms/PS2', icon: 'assets/platform-icons/PS2.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 1', url: '/platforms/PS1', icon: 'assets/platform-icons/PS1.svg', theme: 'platform_theme' },

    { title: 'Xbox Series X', url: '/platforms/XSX', icon: 'assets/platform-icons/series-x.svg', theme: 'platform_theme' },
    //{ title: 'Xbox One', url: '/platforms/XONE', icon: 'assets/platform-icons/XONE.svg', theme: 'platform_theme' },
    //{ title: 'Xbox 360', url: '/platforms/X360', icon: 'assets/platform-icons/X360.svg', theme: 'platform_theme' },
    //{ title: 'Xbox', url: '/platforms/XBOX', icon: 'assets/platform-icons/XBOX.svg', theme: 'platform_theme' },

    { title: 'Nintendo Switch', url: '/platforms/NX', icon: 'assets/platform-icons/switch.svg', theme: 'platform_theme' },
    //{ title: 'Nintendo Wii U', url: '/platforms/WIIU', icon: 'assets/platform-icons/WIIU.svg', theme: 'platform_theme' },
    //{ title: 'Nintendo Wii', url: '/platforms/WII', icon: 'assets/platform-icons/WII.svg', theme: 'platform_theme' },

    { title: 'Android', url: '/platforms/Android', icon: 'assets/platform-icons/android.svg', theme: 'platform_theme' },
    { title: 'iOS', url: '/platforms/IOS', icon: 'assets/platform-icons/ios.svg', theme: 'platform_theme' },

  ];
  constructor(
    private ccService: NgcCookieConsentService
  ) {
    this.initializeApplication();
  }
  handleClickSound() {
    let x = <HTMLVideoElement>document.getElementById("myAudio");
    x.play();
  }
  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  initializeApplication() {
    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    const analytics = getAnalytics(app);
  }
}
