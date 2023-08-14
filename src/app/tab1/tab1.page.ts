import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsQR from 'jsqr';
import { IndexedDbServiceService } from '../indexed-db-service.service';
import { ModalController } from '@ionic/angular';
import { BillingDetailsPage } from '../billing-details/billing-details.page';
import { AddAdditionalDataPage } from '../add-additional-data/add-additional-data.page';

export const QRCodeSections: { [key: number]: string } = {
  0: 'QRType',
  1: 'Version',
  2: 'CodingType',
  3: 'Konto',
  4: 'ZE_Adress-Typ',
  5: 'ZE_Name',
  6: 'ZE_Strasse',
  7: 'ZE_Hausnummer',
  8: 'ZE_PLZ',
  9: 'ZE_Ort',
  10: 'ZE_Land',
  11: 'EZE_Adress-Typ',
  12: 'EZE_Name',
  13: 'EZE_Strasse',
  14: 'EZE_Hausnummer',
  15: 'EZE_PLZ',
  16: 'EZE_Ort',
  17: 'EZE_Land',
  18: 'Betrag',
  19: 'Währung',
  20: 'EZP_Adress-Typ',
  21: 'EZP_Name',
  22: 'EZP_Strasse',
  23: 'EZP_Hausnummer',
  24: 'EZP_PLZ',
  25: 'EZP_Ort',
  26: 'EZP_Land',
  27: 'Referenztyp',
  28: 'Referenz',
  29: 'Unstrukturierte_Mitteilung',
  30: 'Trailer',
  31: 'Rechnungsinformationen',
  32: 'AV1_Parameter',
  33: 'AV2_Parameter',
};

export type QRData = {
  [key: string]: string;
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  billingItems: any[] = [];
  billingSum: number = 0;
  openBills: number = 0;

  constructor(
    private httpClient: HttpClient,
    private indexedDbService: IndexedDbServiceService,
    private modal: ModalController
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  addNewBill() {
    // Dateiauswahl-Dialog öffnen
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Nur Bilddateien zulassen
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.processQRCodeImage(file);
      } else {
        alert('Keine Datei ausgewählt.');
      }
    };
    input.click();
  }

  async processQRCodeImage(file: File) {
    const imageSrc = await this.convertImageToDataURL(file);
    if (imageSrc) {
      this.decodeQRCode(imageSrc).then((dataMatrix) => {
        if (dataMatrix) {
          // Verarbeite dataMatrix hier, z.B.:
          this.parseQRCodeData(dataMatrix);

        } else {
          alert('QR-Code konnte nicht decodiert werden.');
        }
      });
    } else {
      alert('Bild konnte nicht in eine Daten-URL konvertiert werden.');
    }
  }

  private convertImageToDataURL(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string | null);
      };
      reader.readAsDataURL(file);
    });
  }

  private decodeQRCode(imageSrc: string): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        if (context !== null) {
          context.drawImage(img, 0, 0, img.width, img.height);

          const imageData = context.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, img.width, img.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            resolve(code.data);
          } else {
            resolve(null);
          }
        }
      };
    });
  }

  private async parseQRCodeData(textContent: string) {
    var status = 'incomplete';
    const lines = textContent.split('\n');
    const data: QRData = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const sectionKey = this.getValueByIndex(i, QRCodeSections);
        if (sectionKey) {
          data[sectionKey] = line;
        }
      }
    }

    const jsonData = {
      currency: data['Währung'],
      amount: parseFloat(data['Betrag']),
      reference: data['Unstrukturierte_Mitteilung'],
      slipData: data['Rechnungsinformationen'],
      creditor: {
        name: data['ZE_Name'],
        address: data['ZE_Strasse'],
        buildingNumber: data['ZE_Hausnummer'],
        zip: data['ZE_PLZ'],
        city: data['ZE_Ort'],
        country: data['ZE_Land'],
        account: data['Konto'],
      },
      debtor: {
        name: data['EZP_Name'],
        address: data['EZP_Strasse'],
        buildingNumber: data['EZP_Hausnummer'],
        zip: data['EZP_PLZ'],
        city: data['EZP_Ort'],
        country: data['EZP_Land'],
      },
      customBillyData: {
        creditorLogo: await this.getCreditorLogo(data['ZE_Name']),
        dueDate: undefined,
        status: 'OPEN',
        paidTimestamp: undefined,
        notes: undefined,
        documents: [],
        tags: [],
      },
    };

    if(jsonData.customBillyData.dueDate == undefined || jsonData.amount == null || jsonData.amount == undefined) {
      const modal = await this.modal.create({
        component: AddAdditionalDataPage,
        componentProps: {
          billingDetails: jsonData
        }
      });
  
      // TODO: Angepasste Daten erfassen und ins JSON-Modell einfügen
      // JSON-Modell zurückgeben aus Modal und dem "jsonData" zuweisen;
      // Abschliessend Speichern

      // TODO: Logo-Fetch prüfen, z.B. Dominik -> Dominos Pizza...
      // TODO: Problem mit Foto von Samsung prüfen ggf. mal am iPhone testen.
      // TODO: PWA, Header, Icon, ect.

      modal.onDidDismiss().then((data) => {
        //this.billingItems = [];
        //this.getItems();
        console.log(data);
        status = 'complete';
        this.addItem(data.data);
        this.billingItems.push(data.data);
        status = 'finished';
      });
  
      await modal.present();
    }

    while(status != 'incomplete') {      
      this.addItem(jsonData);
      this.billingItems.push(jsonData);
      status = 'finished';
    }
  }

  async getCreditorLogo(name: string): Promise<string | any> {
    try {
      const subscription: any = await this.httpClient
        .get(
          'https://autocomplete.clearbit.com/v1/companies/suggest?query=' +
            name.substring(0, 5)
        )
        .toPromise();
        return subscription[0].logo;
    } catch (error) {
      console.error('Fehler beim Abrufen des Logos:', error);
      return ''; // Leerer String oder einen Platzhalter zurückgeben
    }
  }
  

  getValueByIndex<T>(index: number, obj: { [key: number]: T }): T | undefined {
    return obj[index];
  }

  async presentDueDateController(billingItem: any) {
    const modal = await this.modal.create({
      component: BillingDetailsPage,
      componentProps: {
        billingDetails: billingItem
      }
    });

    modal.onDidDismiss().then((data) => {
      this.billingItems = [];
      this.getItems();
    });

    return await modal.present();
  }

  addItem(data: any) {
    this.indexedDbService.addItem(data).then((id) => {
    });

    this.openBills++;
    this.billingSum += data.amount;
  }

  getItems() {
    this.billingSum = 0;
    this.openBills = 0;

    this.indexedDbService.getAllItems().then((items) => {
      items.forEach((element) => {
        this.billingItems.push(element);
        if(element.customBillyData.status !== 'PAID') {
          this.billingSum += element.amount;
          this.openBills++;
        }
      });
    });
  }

  async showDetails(billingItem: any) {
    const modal = await this.modal.create({
      component: BillingDetailsPage,
      componentProps: {
        billingDetails: billingItem
      }
    });

    modal.onDidDismiss().then((data) => {
      this.billingItems = [];
      this.getItems();
    });

    return await modal.present();
  }
}
