import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MapPage} from "../map/map";

@Component({
	selector: 'page-view-order',
	templateUrl: 'view-order.html',
})
export class ViewOrderPage
{

  //constructor gets from server data of past orders user paid for
  // he will see item details, and price of items
  // user can go to map page with orders he already used
	item_detail:any;
	constructor(public navCtrl: NavController, public navParams: NavParams)
  	{
 		this.item_detail = JSON.parse(this.navParams.data);

 		for(var x in this.item_detail)
 		{
 			this.item_detail[x] = JSON.parse(this.item_detail[x]);

 			for(var y in this.item_detail[x])
 			{
 				this.item_detail[x][y]['price_original'] = this.item_detail[x][y]['price'].substring(0, this.item_detail[x][y]['price'].length - 1);
 			}
 		}
 	}

  	ionViewDidLoad()
  	{
    	console.log('ionViewDidLoad ViewOrderPage');
  	}

  	// route to map page
  continueToMap()
  {
    this.navCtrl.push(MapPage);
  }
}
