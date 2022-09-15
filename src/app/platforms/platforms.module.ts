import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { PlatformsPageRoutingModule } from './platforms-routing.module';
import { PlatformsPage } from './platforms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatformsPageRoutingModule,
    ScrollingModule
  ],
  declarations: [PlatformsPage]
})
export class PlatformsPageModule {}
