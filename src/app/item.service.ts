import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ItemService {
  items: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.items = database.list('items');
  }

  getItems() {
    return this.items;
  }

  addItem(newItem: Item) {
    this.items.push(newItem);
  }

  getItemById(itemId: string) {
    return this.database.object('items/' + itemId);
  }

  updateItem(localUpdatedItem) {
    var itemEntryInFirebase = this.getItemById(localUpdatedItem.$key);
    itemEntryInFirebase.update({
      title: localUpdatedItem.title,
      description: localUpdatedItem.description,
      category: localUpdatedItem.category,
      moneySoFar: localUpdatedItem.moneySoFar,
      daysLeft: localUpdatedItem.daysLeft,
      itemImage: localUpdatedItem.itemImage
    });
  }

  deleteItem(localItemToDelete) {
    var itemEntryInFirebase = this.getItemById(localItemToDelete.$key);
    itemEntryInFirebase.remove();
  }
}
