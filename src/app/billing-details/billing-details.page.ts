import { Component, OnInit } from '@angular/core';
import { IndexedDbServiceService } from '../indexed-db-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.page.html',
  styleUrls: ['./billing-details.page.scss'],
})
export class BillingDetailsPage implements OnInit {
  billingDetails: any;

  constructor(
    private indexedDbService: IndexedDbServiceService,
    private modalController: ModalController

  ) {
   }

  ngOnInit() {
  }

  deletePosition() {
    this.indexedDbService.deleteItemById(this.billingDetails.id);
    this.modalController.dismiss();
  }

  setAsPaid() {
    this.billingDetails.customBillyData.status = 'PAID';
    this.billingDetails.customBillyData.paidTimestamp = new Date().toISOString();
    this.indexedDbService.updateItemById(this.billingDetails.id, this.billingDetails);
  }

  setAsUnPaid() {
    this.billingDetails.customBillyData.status = 'OPEN';
    this.indexedDbService.updateItemById(this.billingDetails.id, this.billingDetails);
    
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
