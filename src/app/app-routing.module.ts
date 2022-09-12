import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '', // If user does not enter anything in URL reroute 'platforms/All'
    redirectTo: 'platforms/All',
    pathMatch: 'full'
  },
  {
    path: 'platforms/:id',
    loadChildren: () => import('./platforms/platforms.module').then(m => m.PlatformsPageModule)
  },
  {
    path: '**', //If path doesn't match anything reroute to 'platforms/All' (Leave it at the end)
    redirectTo: 'platforms/All',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
