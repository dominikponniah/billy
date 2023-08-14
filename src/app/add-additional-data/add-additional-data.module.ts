import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdditionalDataPageRoutingModule } from './add-additional-data-routing.module';

import { AddAdditionalDataPage } from './add-additional-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdditionalDataPageRoutingModule
  ],
  declarations: [AddAdditionalDataPage]
})
export class AddAdditionalDataPageModule {}
