import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpostPageRoutingModule } from './cpost-routing.module';

import { CpostPage } from './cpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpostPageRoutingModule
  ],
  declarations: [CpostPage]
})
export class CpostPageModule {}
