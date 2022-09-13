import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../environments/environment';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgcCookieConsentService, NgcNoCookieLawEvent, NgcInitializeEvent, NgcStatusChangeEvent } from "ngx-cookieconsent";
import { Subscription } from "rxjs";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter, map } from "rxjs/operators";

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
    { title: 'All', url: '/platforms/All', icon: 'assets/icon/All.svg', theme: 'platform_theme_all' },

    { title: 'Windows', url: '/platforms/Windows', icon: 'assets/icon/Windows.svg', theme: 'platform_theme' },
    { title: 'Linux', url: '/platforms/Linux', icon: 'assets/icon/Linux.svg', theme: 'platform_theme' },
    { title: 'Stadia', url: '/platforms/Stadia', icon: 'assets/icon/Stadia.svg', theme: 'platform_theme' },

    { title: 'PlayStation 5', url: '/platforms/PS5', icon: 'assets/icon/PS5.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 4', url: '/platforms/PS4', icon: 'assets/icon/PS4.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 3', url: '/platforms/PS3', icon: 'assets/icon/PS3.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 2', url: '/platforms/PS2', icon: 'assets/icon/PS2.svg', theme: 'platform_theme' },
    //{ title: 'PlayStation 1', url: '/platforms/PS1', icon: 'assets/icon/PS1.svg', theme: 'platform_theme' },

    { title: 'Xbox Series X', url: '/platforms/XSX', icon: 'assets/icon/XSX.svg', theme: 'platform_theme' },
    //{ title: 'Xbox One', url: '/platforms/XONE', icon: 'assets/icon/XONE.svg', theme: 'platform_theme' },
    //{ title: 'Xbox 360', url: '/platforms/X360', icon: 'assets/icon/X360.svg', theme: 'platform_theme' },
    //{ title: 'Xbox', url: '/platforms/XBOX', icon: 'assets/icon/XBOX.svg', theme: 'platform_theme' },

    { title: 'Nintendo Switch', url: '/platforms/NX', icon: 'assets/icon/NX.svg', theme: 'platform_theme' },
    //{ title: 'Nintendo Wii U', url: '/platforms/WIIU', icon: 'assets/icon/WIIU.svg', theme: 'platform_theme' },
    //{ title: 'Nintendo Wii', url: '/platforms/WII', icon: 'assets/icon/WII.svg', theme: 'platform_theme' },

    { title: 'Android', url: '/platforms/Android', icon: 'assets/icon/Android.svg', theme: 'platform_theme' },
    { title: 'iOS', url: '/platforms/IOS', icon: 'assets/icon/IOS.svg', theme: 'platform_theme' },

  ];

  constructor(
    private readonly _swUpdate: SwUpdate,
    private _ccService: NgcCookieConsentService
  ) {
    this.initializeApplication();
  }


  handleClickSound() {
    let x = <HTMLVideoElement>document.getElementById("myAudio");
    x.play();
  }

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this._ccService.popupOpen$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this._ccService.popupClose$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.initializeSubscription = this._ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.statusChangeSubscription = this._ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.revokeChoiceSubscription = this._ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.noCookieLawSubscription = this._ccService.noCookieLaw$.subscribe(
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
    // Sw update check.
    const updatesAvailable = this._swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })));

    if (updatesAvailable) {
      updatesAvailable.subscribe(async () => {
        if (confirm('A new version is available, do you want to load it?')) {
          await this.forceSwUnregisterAndUpdate();
        }
      })
    }

    // Initialize Firebase.
    const app = initializeApp(environment.firebase);
    const analytics = getAnalytics(app);
  }

  async forceSwUnregisterAndUpdate() {
    if ("serviceWorker" in navigator) {
      console.log("serviceWorker in navigator");
      await navigator.serviceWorker
        .getRegistrations()
        .then(async (registrations) => {
          console.log(registrations.length);
          for (let registration of registrations) {
            console.log(registration);
            registration.unregister().then((unregResult) => {
              console.log(unregResult);
              window.location.reload();
            });
          }
        });
    }
  }
}
