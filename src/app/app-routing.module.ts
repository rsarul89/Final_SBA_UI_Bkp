import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
//import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: 'skills',
    loadChildren: './skill/skill.module#SkillModule',
    //canLoad: ['AuthGuard']
  },
  {
    path: 'associates',
    loadChildren: './associate/associate.module#AssociateModule',
    //canLoad: ['AuthGuard']
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }