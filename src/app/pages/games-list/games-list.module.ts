import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GamesListPage } from './games-list.page';
import { RouterModule } from '@angular/router';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-4170899751020775',
      adSlot: 2011758199,
      height: 160
    }),
    RouterModule.forChild([{ 
      path: '',
       component: GamesListPage
       }
      ])
  ],
  declarations: [GamesListPage]
})
export class GamesListPageModule {}
