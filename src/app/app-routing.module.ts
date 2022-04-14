
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
    path: 'add-schedule',
    loadChildren: () => import('./menu/add-schedule/add-schedule.module').then( m => m.AddSchedulePageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
   {
    path: 'about-page',
    loadChildren: () => import('./about-page/about-page.module').then( m => m.AboutPagePageModule)
  },
  
//  other pages paths
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

