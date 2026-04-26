import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Website } from 'src/app/interfaces/igdb/website';
import { Game } from '../../interfaces/igdb/game';
import { ApiService } from '../../services/api.service';
import { Share } from '@capacitor/share';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  standalone: false,  // this is now required when using NgModule
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameDetails: Game;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
    private _titleService: Title,
    private _metaService: Meta,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  async ngOnInit() {
    //console.log("ngOnInit!!")
    await this.gameExistGuard();
  }

  async ionViewWillEnter() {
    //console.log('ionViewWillEnter  ');
  }

  async ionViewDidEnter() {
    // console.log('ionViewDidEnter');
  }

  async ionViewWillLeave() {
    //console.log('ionViewWillLeave  ');
  }

  async ionViewDidLeave() {
    //console.log('ionViewDidLeave  ');
  }

  async ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    //console.log('ngOnDestroy  ');
  }

  async gameExistGuard(): Promise<void> {
    const gameSlug: string = this._activatedRoute.snapshot.paramMap.get('gameSlug');
    await (await this._apiService
      .getGameBySlugAsync(gameSlug))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (data) => {
        //console.log(data);
        if (data.length == 0 || data[0]?.slug != gameSlug) {
          this._router.navigate(['']);
        }
        this.gameDetails = data[0];
        this.setSEOData(this.gameDetails.name, this.gameDetails.summary, this.gameDetails.genres.map(x => x.name).toString());
        this.gameDetails.websites = this.gameDetails?.websites?.filter(this.getOnlyTrustedWebSites);
        //console.log(this.gameDetails.name);
      })
  }

  /**
   * Opens link in new tab.
   * @param url 
   */
  goToLink(url: string) {
    window.open(url, "_blank");
  }

  /**
   * Returns website if it is trusted.
   * @param website 
   * @returns 
   */
  getOnlyTrustedWebSites(website: Website) {
    if (website.trusted) {
      return website;
    }
    return null;
  }

  async share() {
    const canShare = await Share.canShare();
    if (!canShare.value) {
      console.warn('Sharing not supported on this platform');
      return;
    }
    await Share.share({
        title: this.gameDetails?.name,
        url: window.location.href,
      });
  }

  setSEOData(title: string, description: string, keywords: string) {
      const pageTitle = `${title} Release Date & Details | VideoGameRelease.com`;
      const pageUrl = `https://videogamerelease.com/game/${this._activatedRoute.snapshot.paramMap.get('gameSlug')}`;
      const imageUrl = this.gameDetails?.cover?.url
        ? this.gameDetails.cover.url.replace('t_thumb', 't_cover_big')
        : 'https://videogamerelease.com/assets/icons/icon-512x512.png';

      // Title + core meta
      this._titleService.setTitle(pageTitle);
      this._metaService.updateTag({ name: 'description', content: description });
      this._metaService.updateTag({ name: 'keywords', content: keywords });

      // Canonical URL
      let canonical: HTMLLinkElement = this._document.querySelector('link[rel="canonical"]');
      if(!canonical) {
        canonical = this._document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        this._document.head.appendChild(canonical);
      }
    canonical.setAttribute('href', pageUrl);

      // Open Graph
      this._metaService.updateTag({ property: 'og:type', content: 'website' });
      this._metaService.updateTag({ property: 'og:url', content: pageUrl });
      this._metaService.updateTag({ property: 'og:title', content: pageTitle });
      this._metaService.updateTag({ property: 'og:description', content: description });
      this._metaService.updateTag({ property: 'og:image', content: imageUrl });

      // Twitter Card
      this._metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this._metaService.updateTag({ name: 'twitter:url', content: pageUrl });
      this._metaService.updateTag({ name: 'twitter:title', content: pageTitle });
      this._metaService.updateTag({ name: 'twitter:description', content: description });
      this._metaService.updateTag({ name: 'twitter:image', content: imageUrl });

      // JSON-LD VideoGame structured data
      let jsonLd: HTMLScriptElement = this._document.querySelector('script[data-type="game-jsonld"]');
      if(!jsonLd) {
        jsonLd = this._document.createElement('script');
        jsonLd.setAttribute('type', 'application/ld+json');
        jsonLd.setAttribute('data-type', 'game-jsonld');
        this._document.head.appendChild(jsonLd);
      }
    jsonLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        'name': title,
        'description': description,
        'genre': keywords.split(',').map(k => k.trim()),
        'url': pageUrl,
        'image': imageUrl,
        'gamePlatform': this.gameDetails?.platforms?.map(p => p.name) ?? [],
      });
    }


}
