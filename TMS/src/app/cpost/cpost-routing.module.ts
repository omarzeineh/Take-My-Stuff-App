import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpostPage } from './cpost.page';

const routes: Routes = [
  {
    path: '',
    component: CpostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpostPageRoutingModule {}
