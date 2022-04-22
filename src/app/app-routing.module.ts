
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';


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
    loadChildren: () => import('./menu/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'schedules',
    loadChildren: () => import('./menu/schedules/schedules.module').then( m => m.SchedulesPageModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'about-page',
    loadChildren: () => import('./menu/about-page/about-page.module').then( m => m.AboutPagePageModule),
    canLoad: [AuthGuard]
  },
  
  /**
   * Paths of landing pages
   */
  {
    path: 'landing',
    loadChildren: () => import('./user-landing-pages/landing/landing.module').then( m => m.LandingPageModule)
    ,
    canLoad: [ AutoLoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./user-landing-pages/login/login.module').then( m => m.LoginPageModule)
    ,canLoad: [ AutoLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./user-landing-pages/register/register.module').then( m => m.RegisterPageModule)
    ,canLoad: [ AutoLoginGuard]
  },
   
  
//  other pages paths
  {
    path: 'schedules/add-schedule',
    loadChildren: () => import('./schedule-pages/add-schedule/add-schedule.module').then( m => m.AddSchedulePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'schedules/all-schedules',
    loadChildren: () => import('./schedule-pages/all-schedules/all-schedules.module').then( m => m.AllSchedulesPageModule),
    canLoad: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

