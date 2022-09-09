import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    //needs a guard in case other than 4 paths is provided!!
    this.categories = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.activatedRoute.snapshot.paramMap);


      this.apiService.getGames().subscribe((data) => {
        console.log(data);
      });
  }
}
