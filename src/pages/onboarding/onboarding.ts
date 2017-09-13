import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../../pages/login/login";
import { SignupPage } from "../../pages/signup/signup";

@Component({
    selector: 'page-onboarding',
    templateUrl: 'onboarding.html',
})
export class OnboardingPage
{
    constructor(public navCtrl: NavController, public navParams: NavParams)
    {

    }

    //homepage, what will user will see when he opens the app

    ionViewDidLoad()
    {
        console.log('ionViewDidLoad OnboardingPage');
    }

    loginPage()
    {
        this.navCtrl.push(LoginPage);
    }

    signupPage()
    {
        this.navCtrl.push(SignupPage);
    }
}
