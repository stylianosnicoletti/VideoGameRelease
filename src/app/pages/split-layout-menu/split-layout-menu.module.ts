import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SplitLayoutMenuPageRoutingModule } from './split-layout-menu-routing.module';
import { SplitLayoutMenuPage } from './split-layout-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitLayoutMenuPageRoutingModule
  ],
  declarations: [SplitLayoutMenuPage]
})
export class SplitLayoutMenuPageModule {}
