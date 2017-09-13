import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ViewgrocerydetailsPage } from '../viewgrocerydetails/viewgrocerydetails';

@Component({
	selector: 'page-grocerylist',
	templateUrl: 'grocerylist.html',
})
export class GrocerylistPage
{
	grocery_list : any;
	category_name : any;
	category_id : any;
	constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider)
	{
		this.refreshData(this.navParams.data.category_id);
		this.category_name = this.navParams.data.category_name;
		this.category_id = this.navParams.data.category_id;
	}

	ionViewDidLoad()
	{
		console.log('ionViewDidLoad GrocerylistPage');
	}

	// shows groceries items by there id from server --> do it with paging so it won't stuck when loading
	refreshData(id)
	{
		this.auth.loadingShow();
		this.auth.requestGet("grocery_by_id.php?category_id="+id)
		.then(res=>
		{
			this.auth.loadingHide();
			this.grocery_list = res;
		});
	}
	ionViewDidEnter()
	{
		//this.refreshData();
	}

	// shows the specific item when clicking on "show product" button, we will get all item properties include image of item
	openGrocery(item)
	{
		this.navCtrl.push(ViewgrocerydetailsPage,{grocery:item,category_name:this.category_name,category_id:this.category_id});
	}

}
