import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-viewgrocerydetails',
  templateUrl: 'viewgrocerydetails.html',
})
export class ViewgrocerydetailsPage
{
  grocery : any;
  selecteditem : [{grocery_id:"",grocery_name:"",grocery_image:"",price:"",description:"",category_id:""}];
  data: any;
  quantity : any;
  value : any;
  category_name : any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    console.log(this.navParams.data);
    this.grocery = this.navParams.data.grocery;
    this.category_name = "category_"+this.navParams.data.category_id;
    this.quantity = 1;
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ViewgrocerydetailsPage');
  }

  //user can decide the quantity of each product he want to add the cart
  optionsFn()
  {
    console.log(this.quantity);
    this.value = this.quantity;
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

  //when user selected the item he want to add to cart, the system push item to cart
  // shows every parameter item have, quantity and price of it.
  selectedItem(item)
  {
    console.log(item);

    if(localStorage.getItem(this.slugify(this.category_name))==null || localStorage.getItem(this.slugify(this.category_name))==undefined)
    {
      var temp =[];
      item['quantity'] = this.quantity;
      temp.push(item);
      localStorage.setItem(this.slugify(this.category_name),"["+JSON.stringify(item)+"]");
      this.navCtrl.push(CartPage);
    }
    else
    {
      var temp1 = JSON.parse(localStorage.getItem(this.slugify(this.category_name)));
      item['quantity'] = this.quantity;
      temp1.push(item);
      var key = this.slugify(this.category_name);
      localStorage.setItem(key,JSON.stringify(temp1));
      this.navCtrl.push(CartPage);
    }
    //	this.selecteditem.push(JSON.parse(item));
    //	console.log(this.selecteditem);
  }

}
