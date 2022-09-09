import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private _httpOptions = {
        headers: new HttpHeaders({
          'x-api-key': environment.awsProxyApiKey
      })};

    constructor(
        private httpClient: HttpClient) { }

    public getGames(): Observable<any>{
        return this.httpClient.post(
            'https://5qwzyqsvol.execute-api.us-west-2.amazonaws.com/production/v4/games',
            'fields *; where rating > 89; limit 15;',
            this._httpOptions);
    }
}
