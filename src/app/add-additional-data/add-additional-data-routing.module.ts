import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdditionalDataPage } from './add-additional-data.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdditionalDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdditionalDataPageRoutingModule {}
