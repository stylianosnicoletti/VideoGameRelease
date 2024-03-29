import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlatformId } from '../enums/platformId';
import { ReleaseDate } from '../interfaces/igdb/releaseDate';
import { Game } from '../interfaces/igdb/game';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _proxyUrl = environment.awsProxyUrl;
  private _httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': environment.awsProxyApiKey,
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public async getReleaseDatesAscendingAsync(
    platformIds: PlatformId[],
    take: Number,
    offset: Number,
    fromDate: Number,
    searchInput: string,
  ): Promise<Observable<ReleaseDate[]>> {
    return await this.httpClient.post<ReleaseDate[]>(
      this._proxyUrl + 'v4/release_dates',
      `
      fields
        human,
        platform.slug,
        game.id,
        game.slug,
        game.name,
        game.url,
        game.summary,
        game.cover.url,
        game.genres.name;
      where 
        platform = (${platformIds}) &
        date >= ${fromDate} &
        human = *", 20"* &
        game.summary != null &
        game.genres > 0 &
        game.cover.url != null &
        (game.follows != null | game.hypes != null) &
        game.name ~ *"${searchInput}"* ;
      sort
        date asc;
      limit
        ${take};
      offset
        ${offset};
      `,
      this._httpOptions
    );
  }

  public async getGameBySlugAsync(gameSlug: string): Promise<Observable<Game[]>> {
    return await this.httpClient.post<Game[]>(
      this._proxyUrl + 'v4/games',
      `
      fields
        name,
        slug,
        summary,
        cover.url,
        genres.name,
        websites.url,
        websites.trusted,
        platforms.name;
      where
        slug = "${gameSlug}" ;
      limit 
        1;
      `,
      this._httpOptions
    );
  }
}
