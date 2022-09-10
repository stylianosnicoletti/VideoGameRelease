import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/game';
import { PlatformId } from '../enums/platformId';

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

  public getGames(ids: string[]): Observable<Game[]> {
    return this.httpClient.post<Game[]>(
      this._proxyUrl + 'v4/games',
      `fields name,release_dates; where id = (4356,189,444); limit 10;`,
      this._httpOptions
    );
  }

    public getReleaseDatesv2(platform: Number, take: Number, offset: Number): Observable<any> {
      return this.httpClient.post<any>(
        this._proxyUrl + 'v4/release_dates',
        `fields *; where game.platforms = 6 & date > 1538129354 & human = *", 20"*; sort date desc; limit 22; offset 50;`,
        this._httpOptions
      );
  }

  public getReleaseDates(platformIds: PlatformId[], take: Number, offset: Number): Observable<any> {
    return this.httpClient.post<any>(
      this._proxyUrl + 'v4/platforms',
      `fields *; where id = (${platformIds}); limit 160;`,
      this._httpOptions
    );
}
}

