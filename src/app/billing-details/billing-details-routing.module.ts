import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingDetailsPage } from './billing-details.page';

const routes: Routes = [
  {
    path: '',
    component: BillingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingDetailsPageRoutingModule {}
