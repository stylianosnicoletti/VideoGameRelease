import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplitLayoutPage } from './split-layout.page';

const routes: Routes = [
  {
    path: '', // If user does not enter anything in URL reroute 'platforms/All'
    redirectTo: 'platforms/All',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SplitLayoutPage,
    children:
    [
      {
        path: 'platforms/:id',
        loadChildren: () => import('../platforms/platforms.module').then(m => m.PlatformsPageModule)
      }
    ]  
  },
  {
    path: '**', //If path doesn't match anything reroute to 'menu' (Leave it at the end)
    redirectTo: 'platforms/All',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitLayoutPageRoutingModule { }
