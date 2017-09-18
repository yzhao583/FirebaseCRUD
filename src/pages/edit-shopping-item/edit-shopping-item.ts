
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interfaces';


@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemRef: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;
  shoppingItemSubscription: Subscription;

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase

  ) {
    const shoppingItemId = this.navParams.get('shoppingItemId');

    this.shoppingItemRef = this.database.object('shopping-list/' + shoppingItemId);
    this.shoppingItemSubscription = this.shoppingItemRef.subscribe(shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef.update(shoppingItem);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.shoppingItemSubscription.unsubscribe();
  }

}
