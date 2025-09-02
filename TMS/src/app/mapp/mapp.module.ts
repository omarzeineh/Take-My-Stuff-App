import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MappPageRoutingModule } from './mapp-routing.module';

import { MappPage } from './mapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MappPageRoutingModule
  ],
  declarations: [MappPage]
})
export class MappPageModule {}
