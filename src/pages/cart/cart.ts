import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from "../map/map";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CheckoutPage } from '../checkout/checkout';

@Component({
	selector: 'page-cart',
	templateUrl: 'cart.html',
})
export class CartPage
{
	cart : any;
	is_item = false;
	total = 0;
	category_list : any;
	product_list = [];
	constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider)
	{
		this.fetchData();
	}


// get data from server -> php files, the fetchData() shows the item we chose from grocery list
// when item selected it redirects to cart page, we can see the item name, item price, which category it belongs
// and total price of products we chose

	fetchData()
	{
		this.auth.requestGet("category_list.php")
		.then(res=>
		{
			this.category_list = res;
			console.log(res);
			var index = 0;
			for(var x in res)
			{
				var category_name = "category_"+this.slugify(res[x]['category_id']);
				var category_id = res[x]['category_id'];
				var category_name_original = res[x]['category_name'];
				if(localStorage.getItem(category_name)!=undefined || localStorage.getItem(category_name)!=null)
				{
					var temp_cart = JSON.parse(localStorage.getItem(category_name));

					if(temp_cart.length>0)
					{
						this.is_item = true;
						var temp = {category_name_original:category_name_original,items:temp_cart,category_id:category_id}
						this.product_list[index] = temp;

						for(var aa in this.product_list[index]['items'])
						{
							this.product_list[index]['items'][aa]['price'] = this.product_list[index]['items'][aa]['price'].substring(0,this.product_list[index]['items'][aa]['price'].length-1);
						}

						index++;

						for(var xx in temp_cart)
						{
							var str = temp_cart[xx]['price'];
							str = str.substring(0, str.length - 1);
							this.total+= parseFloat(str)*parseInt(temp_cart[xx]['quantity']);
						}
					}
				}
			}
		});
	}



	slugify(text)
	{
		return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
	}

	// removeItem() purpose to remove an item from cart that we selected by accident or we decided we don't need
	removeItem(category,index)
	{
		var localData = JSON.parse(localStorage.getItem("category_"+category));
		localData.items = localData.splice(index,1);
		localStorage.setItem("category_"+category,JSON.stringify(localData));
		this.is_item = false;
		this.product_list = [];
		this.fetchData();
		this.total = 0;
	}

	// route back to grocery page to continue our buy
	productListPage()
	{
		if(this.navCtrl.length()==2)
		{
			this.navCtrl.pop();
		}
		else
		{
			this.navCtrl.popTo( this.navCtrl.getByIndex(1));
		}
	}


// route to checkout form page
	continueToCheckout()
	{
		this.navCtrl.push(CheckoutPage);
	}

	// route to map page if we want to navigate before we pay for our items in cart
  continueToMap()
  {
    this.navCtrl.push(MapPage);
  }
}
