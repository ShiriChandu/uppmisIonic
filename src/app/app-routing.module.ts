import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'formselection',
    loadChildren: () => import('./pages/formselection/formselection.module').then( m => m.FormselectionPageModule)
  },
  {
    path: 'slitcontent',
    loadChildren: () => import('./pages/slitcontent/slitcontent.module').then( m => m.SlitcontentPageModule)
  },
  {
    path: 'slumptest',
    loadChildren: () => import('./pages/slumptest/slumptest.module').then( m => m.SlumptestPageModule)
  },
  {
    path: 'cccube28',
    loadChildren: () => import('./pages/cccube28/cccube28.module').then( m => m.Cccube28PageModule)
  },
  {
    path: 'seive',
    loadChildren: () => import('./pages/seive/seive.module').then( m => m.SeivePageModule)
  },
  {
    path: 'coarsesingle',
    loadChildren: () => import('./pages/coarsesingle/coarsesingle.module').then( m => m.CoarsesinglePageModule)
  },
  {
    path: 'ca40',
    loadChildren: () => import('./pages/ca40/ca40.module').then( m => m.Ca40PageModule)
  },
  {
    path: 'ca20',
    loadChildren: () => import('./pages/ca20/ca20.module').then( m => m.Ca20PageModule)
  },
  {
    path: 'ca12',
    loadChildren: () => import('./pages/ca12/ca12.module').then( m => m.Ca12PageModule)
  },
  {
    path: 'example',
    loadChildren: () => import('./pages/example/example.module').then( m => m.ExamplePageModule)
  },
  {
    path: 'steelunit',
    loadChildren: () => import('./pages/steelunit/steelunit.module').then( m => m.SteelunitPageModule)
  },
  {
    path: 'waterabsorption',
    loadChildren: () => import('./pages/waterabsorption/waterabsorption.module').then( m => m.WaterabsorptionPageModule)
  },
  {
    path: 'cccube07',
    loadChildren: () => import('./pages/cccube07/cccube07.module').then( m => m.Cccube07PageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
