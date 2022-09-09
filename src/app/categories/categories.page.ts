// eslint-disable-next-line

import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthToken } from '../interfaces/authToken';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  public categories: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    //needs a guard
    this.categories = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.activatedRoute.snapshot.paramMap);
    /*this.apiService.getAccessToken().subscribe((authToken) => {
      console.log(authToken);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Client-ID': 's6uz6vqq5yknu1a5gf5ycz5r7avp2c',
          Authorization: `Bearer ${authToken.access_token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Client-ID, Authorization'
        })
      };*/

      const httpOptions = {
        headers: new HttpHeaders({
          'x-api-key': 'x4IfUAKWNx4IA5w0ijOUrixAsdOcmzh87ugxvGHj'
      })};

      this.apiService.getGames(httpOptions).subscribe((data) => {
        console.log(data);
      });
  }
}
