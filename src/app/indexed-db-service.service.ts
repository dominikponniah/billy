import { Injectable } from '@angular/core';
import Dexie from 'dexie';


@Injectable({
  providedIn: 'root'
})
export class IndexedDbServiceService extends Dexie {
  private items: Dexie.Table<any, number>;

  constructor() {
    super('MyIndexedDB'); // Datenbankname
    this.version(1).stores({
      items: '++id' // Definiere eine Tabelle mit einer automatisch inkrementierenden ID
    });
    this.items = this.table('items');
  }

  addItem(item: any): Promise<number> {
    return this.items.add(item);
  }

  getAllItems(): Promise<any[]> {
    return this.items.toArray();
  }

  updateItemById(id: number, newData: any): Promise<number> {
    return this.items.update(id, newData);
  }

  deleteItemById(id: number): Promise<void> {
    return this.items.delete(id);
  }
}