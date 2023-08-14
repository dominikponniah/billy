import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'billing-details',
    loadChildren: () => import('./billing-details/billing-details.module').then( m => m.BillingDetailsPageModule)
  },
  {
    path: 'add-additional-data',
    loadChildren: () => import('./add-additional-data/add-additional-data.module').then( m => m.AddAdditionalDataPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
