import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // Side Menu Navigation Paths
  {
    path: 'home',
    loadChildren: () => import('./menu/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'schedules',
    loadChildren: () => import('./menu/schedules/schedules.module').then( m => m.SchedulesPageModule)
  },

//  other pages paths
  {
    path: 'add-schedule',
    loadChildren: () => import('./menu/add-schedule/add-schedule.module').then( m => m.AddSchedulePageModule)
  },
  {
    path: 'schedules/all-schedules',
    loadChildren: () => import('./schedule-pages/all-schedules/all-schedules.module').then( m => m.AllSchedulesPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
