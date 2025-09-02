import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MappPage } from './mapp.page';

const routes: Routes = [
  {
    path: '',
    component: MappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappPageRoutingModule {}
