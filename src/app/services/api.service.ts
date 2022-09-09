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
    clientSecret = '***REMOVED***';
    grantType = 'client_credentials';

    constructor(
        private httpClient: HttpClient) { }

  /*  public getAccessToken(): Observable<AuthToken>{
        return this.httpClient.post<AuthToken>(
            `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=${this.grantType}`,
             null);
    }
*/
    public getGames(opt): Observable<any>{
        return this.httpClient.post('https://5qwzyqsvol.execute-api.us-west-2.amazonaws.com/production/v4/games',null,opt);
        //return this.httpClient.request(httpReq);
    }
}