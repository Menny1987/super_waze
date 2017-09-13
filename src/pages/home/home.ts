import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { AddshoppinglistPage } from '../addshoppinglist/addshoppinglist';
import { OnboardingPage  } from '../onboarding/onboarding';
import { Events } from 'ionic-angular';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
	username = '';
	constructor(public navCtrl: NavController,public auth:AuthServiceProvider,public events:Events) 
	{
		let info = JSON.parse(localStorage.getItem("user_data"));
		this.username = info[0]['CustName']+" "+info[0]['LastName'];
    this.loadUserData();
	  
    events.subscribe('menu:logout', (res) =>
    {
      this.navCtrl.setRoot(OnboardingPage);
    });
  }
	public logout() 
	{
    	this.auth.logout().subscribe(succ => 
    	{
      		this.navCtrl.setRoot(OnboardingPage);
    	});
  	}
  	public addListPage()
  	{
  		console.log("ghg");
  		this.navCtrl.push(AddshoppinglistPage);
  	}

    loadUserData()
    {
        this.events.publish('menu:clicked', {});
    }
    checkoutPage()
    {
      this.navCtrl.push(CartPage);
    }

}
