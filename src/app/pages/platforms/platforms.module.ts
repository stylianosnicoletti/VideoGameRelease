import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { PlatformsPage } from './platforms.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ 
      path: '',
       component: PlatformsPage
       }
      ]),
    ScrollingModule
  ],
  declarations: [PlatformsPage]
})
export class PlatformsPageModule {}
