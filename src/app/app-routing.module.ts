import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', // If user does not enter anything in URL reroute 'menu'
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/split-layout-menu/split-layout-menu.module').then(m => m.SplitLayoutMenuPageModule)
  },
  {
    path: 'game/:id',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GamePageModule)
  },
  {
    path: '**', //If path doesn't match anything reroute to 'menu' (Leave it at the end)
    redirectTo: 'menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
