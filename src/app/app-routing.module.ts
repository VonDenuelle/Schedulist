import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./menu/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'schedules',
    loadChildren: () => import('./menu/schedules/schedules.module').then( m => m.SchedulesPageModule)
  },
  {
    path: 'about-page',
    loadChildren: () => import('./about-page/about-page.module').then( m => m.AboutPagePageModule)
  },
  {
    path: 'add-schedule',
    loadChildren: () => import('./menu/add-schedule/add-schedule.module').then( m => m.AddSchedulePageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
