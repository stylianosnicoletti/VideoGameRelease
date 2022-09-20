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

  constructor(
    private readonly _swUpdate: SwUpdate,
    private _ccService: NgcCookieConsentService
  ) {
    this.initializeApplication();
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

    this._swUpdate.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
    
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
