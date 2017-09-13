import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigationPage } from '../navigation/navigation';

@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})
export class MapPage
{
  //gets from this cordinates the map page of the specific supermarket
	bounds = {};
  	constructor(public navCtrl: NavController, public navParams: NavParams)
  	{
  		this.bounds =
  		{
		    "north": 40.773941,
		    "south": 40.712216,
		    "east": -74.12544,
		    "west": -74.22655
		}
  	}

  	ionViewDidLoad()
  	{

  	}

  	// route to map page
    navigation()
    {
      this.navCtrl.push(NavigationPage);
    }
}
