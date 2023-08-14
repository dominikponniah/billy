import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingDetailsPageRoutingModule } from './billing-details-routing.module';

import { BillingDetailsPage } from './billing-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingDetailsPageRoutingModule
  ],
  declarations: [BillingDetailsPage]
})
export class BillingDetailsPageModule {}
