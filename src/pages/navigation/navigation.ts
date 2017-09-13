import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage 
{
	direction : any;
	city_name : any;
	constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider) 
	{
		//http://myjson.com/6v6i5
		//https://api.myjson.com/bins/6v6i5
		
		this.auth.loadingShow();
		this.auth.requestGet("direction.php")
		.then(res=>
		{
			this.city_name = res['city_name'];
			this.auth.loadingHide();
			this.direction = res['direction'];
		});
	}

	ionViewDidLoad() 
	{
		console.log('ionViewDidLoad NavigationPage');
	}
}