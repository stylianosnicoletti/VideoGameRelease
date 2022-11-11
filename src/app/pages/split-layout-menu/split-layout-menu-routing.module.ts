import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplitLayoutMenuPage } from './split-layout-menu.page';

const routes: Routes = [
  {
    path: '', // If user does not enter anything in URL reroute 'games-list'
    redirectTo: 'games-list',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SplitLayoutMenuPage,
    children:
    [
      {
        path: 'games-list',
        loadChildren: () => import('../games-list/games-list.module').then(m => m.GamesListPageModule)
      }
    ]  
  },
  {
    path: '**', //If path doesn't match anything reroute to 'menu' (Leave it at the end)
    redirectTo: 'games-list',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitLayoutMenuPageRoutingModule { }
