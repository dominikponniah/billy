import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-additional-data',
  templateUrl: './add-additional-data.page.html',
  styleUrls: ['./add-additional-data.page.scss'],
})
export class AddAdditionalDataPage implements OnInit {
  billingDetails: any;

  billingAmountIsSet = false;
  billingDueDateIsSet = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if(this.billingDetails.amount !== null && this.billingDetails.amount !== undefined) {
      this.billingAmountIsSet = true;
    }

    if(this.billingDetails.customBillyData.dueDate !== null && this.billingDetails.customBillyData.dueDate !== undefined) {
      this.billingDueDateIsSet = true;
    }
  }

  saveChanges() {
    this.billingDetails.amount = parseFloat(this.billingDetails.amount);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss(this.billingDetails);
  }
}
