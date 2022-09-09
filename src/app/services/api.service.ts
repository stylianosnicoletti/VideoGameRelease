import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/game';

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

  public getGames(): Observable<Game[]> {
    return this.httpClient.post<Game[]>(
      this._proxyUrl + 'v4/games',
      'fields *; where rating > 89; limit 15;',
      this._httpOptions
    );
  }
}
