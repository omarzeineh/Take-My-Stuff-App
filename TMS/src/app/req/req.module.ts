import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqPageRoutingModule } from './req-routing.module';

import { ReqPage } from './req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqPageRoutingModule
  ],
  declarations: [ReqPage]
})
export class ReqPageModule {}
