import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GrocerylistPage } from '../grocerylist/grocerylist';

@Component({
	selector: 'page-addshoppinglist',
	templateUrl: 'addshoppinglist.html',
})
export class AddshoppinglistPage
{
	category_list : any;
	constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider)
	{
		this.refreshData();
	}

	ionViewDidLoad()
	{
		console.log('ionViewDidLoad AddshoppinglistPage');
	}

	//paging the list of groceries on each category
	refreshData()
	{
		this.auth.loadingShow();
		this.auth.requestGet("category_list.php")
		.then(res=>
		{
			this.auth.loadingHide();
			this.category_list = res;
		});
	}

	ionViewDidEnter()
	{
		//this.refreshData();
	}

	//route to Grocery list page where we can choose the specific category of groceries
	itemSelected(item: any)
	{
    	this.navCtrl.push(GrocerylistPage,item);
  	}

}
