import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { OnboardingPage } from '../../pages/onboarding/onboarding';


@Component({
	selector: 'page-intro',
	templateUrl: 'intro.html',
})
export class IntroPage 
{
 	@ViewChild(Slides) slides: Slides;
  	constructor(public navCtrl: NavController, public navParams: NavParams) 
  	{
  	}

  	ionViewDidLoad() 
  	{
    	console.log('ionViewDidLoad IntroPage');
  	}
  	slideChanged() 
  	{
    	let currentIndex = this.slides.getActiveIndex();
    	console.log('Current index is', currentIndex);

    	if(currentIndex==5)
    	{
    		this.navCtrl.setRoot(OnboardingPage);
    	}
  	}
}