import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreqPageRoutingModule } from './creq-routing.module';

import { CreqPage } from './creq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreqPageRoutingModule
  ],
  declarations: [CreqPage]
})
export class CreqPageModule {}
