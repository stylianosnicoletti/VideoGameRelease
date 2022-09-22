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

  constructor(private httpClient: HttpClient) { }

  public async getSinglePlatformUpComingReleaseDatesAscendingAsync(
    platformIds: PlatformId[],
    take: Number,
    offset: Number,
    fromDate: Number
  ): Promise<Observable<ReleaseDate[]>> {
    return await this.httpClient.post<ReleaseDate[]>(
      this._proxyUrl + 'v4/release_dates',
      `fields human, platform.slug, game.id, game.name, game.url, game.summary, game.cover.url, game.genres.name; where platform = (${platformIds}) & date >= ${fromDate} & human = *" 20"* &  game.cover.url != null; sort date asc; limit ${take}; offset ${offset};`,
      this._httpOptions
    );
  }

  public async getMultiPlatformUpComingReleaseDatesAscendingAsync(
    platformIds: PlatformId[],
    take: Number,
    offset: Number,
    fromDate: Number
  ): Promise<Observable<ReleaseDate[]>> {
    return await this.httpClient.post<ReleaseDate[]>(
      this._proxyUrl + 'v4/release_dates',
      `fields human, platform.slug, game.id, game.name, game.url, game.summary, game.cover.url, game.genres.name; where platform = (${platformIds}) & date >= ${fromDate} & human = *" 20"* &  game.cover.url != null; sort date asc; limit ${take}; offset ${offset};`,
      this._httpOptions
    );
  }

  public async getGameAsync(
    gameId: String
  ): Promise<Observable<Game[]>>{
    return await this.httpClient.post<Game[]>(
      this._proxyUrl + 'v4/games',
      `fields name, summary, cover.url, genres.name, websites.url, websites.trusted, platforms.name; where id = (${gameId}); limit 1;`,
      this._httpOptions
    );
  }
}
