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
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'my',
    loadChildren: () => import('./my/my.module').then( m => m.MyPageModule)
  },
  {
    path: 'cpost',
    loadChildren: () => import('./cpost/cpost.module').then( m => m.CpostPageModule)
  },
  {
    path: 'creq',
    loadChildren: () => import('./creq/creq.module').then( m => m.CreqPageModule)
  },
  {
    path: 'mapp',
    loadChildren: () => import('./mapp/mapp.module').then( m => m.MappPageModule)
  },
  {
    path: 'req',
    loadChildren: () => import('./req/req.module').then( m => m.ReqPageModule)
  },
  {
    path: 'noti',
    loadChildren: () => import('./noti/noti.module').then( m => m.NotiPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
