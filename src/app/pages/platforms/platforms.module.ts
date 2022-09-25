import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      ])
  ],
  declarations: [PlatformsPage]
})
export class PlatformsPageModule {}
