import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ViewOrderPage } from '../view-order/view-order';

@Component({
	selector: 'page-history',
	templateUrl: 'history.html',
})
export class HistoryPage
{
	order : any;

	//gets data from server on orders the user pay for them.
	constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider,public loadingCtrl: LoadingController)
	{
		this.auth.loadingShow();
		var userid = JSON.parse(localStorage.getItem("user_data"))[0]['idetity'];
		this.auth.requestGet("order_list.php?id="+userid)
		.then(res=>
		{
			this.order = res;
			this.auth.loadingHide();
		});
  	}

  	ionViewDidLoad()
	{
    	console.log('ionViewDidLoad HistoryPage');
  	}

  	// route to orders history page
  	viewOrderDetail(item)
  	{
  		this.navCtrl.push(ViewOrderPage,item);
  	}
}
