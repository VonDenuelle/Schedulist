
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

  /**
   * Paths inside Side Menu Navigation
   */
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
    loadChildren: () => import('./menu/about-page/about-page.module').then( m => m.AboutPagePageModule)
  },
  
  /**
   * Paths of landing pages
   */
  {
    path: 'landing',
    loadChildren: () => import('./user-landing-pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user-landing-pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./user-landing-pages/register/register.module').then( m => m.RegisterPageModule)
  },
   
  
//  other pages paths
  {
    path: 'schedules/add-schedule',
    loadChildren: () => import('./schedule-pages/add-schedule/add-schedule.module').then( m => m.AddSchedulePageModule)
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

