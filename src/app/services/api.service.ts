import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlatformId } from '../enums/platformId';
import { ReleaseDate } from '../interfaces/igdb/releaseDate';

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

  public getReleaseDates(platformIds: PlatformId[], take: Number, offset: Number): Observable<ReleaseDate[]> {

    return this.httpClient.post<ReleaseDate[]>(
      this._proxyUrl + 'v4/release_dates',
      `fields human, platform, game.id, game.name, game.summary, game.cover.*; where platform = (${platformIds}) & date > 1538129354 & human = *", 20"*; sort date desc; limit ${take}; offset ${offset};`,
      this._httpOptions
    );
  }
}

