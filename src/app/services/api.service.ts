import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { AuthToken } from '../interfaces/authToken';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    clientId = 's6uz6vqq5yknu1a5gf5ycz5r7avp2c';
    clientSecret = 'ztv06au4kti54ng8gike713maa4dry';
    grantType = 'client_credentials';

    constructor(
        private httpClient: HttpClient) { }

    public getAccessToken(): Observable<AuthToken>{
        return this.httpClient.post<AuthToken>(
            `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=${this.grantType}`,
             null);
    }

    public getGames(opt): Observable<any>{
        return this.httpClient.post('https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games','fields name; limit 10;',opt);
        //return this.httpClient.request(httpReq);
    }
}
