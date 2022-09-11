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

  constructor(private httpClient: HttpClient) { }

  public getReleaseDates(platformIds: PlatformId[], take: Number, offset: Number): Observable<any> {
    return this.httpClient.post<any>(
      this._proxyUrl + 'v4/release_dates',
      `fields human, platform.name, game.id, game.name, game.summary, game.cover.url; where platform = (${platformIds}) & date > 1538129354 & human = *", 20"*; sort date desc; limit ${take}; offset ${offset};`,
      this._httpOptions
    );
  }
}

