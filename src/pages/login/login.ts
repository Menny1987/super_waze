import { Component } from '@angular/core';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage
{
    public loginForm;
    loading: Loading;
    //loading: any;

  // after user completes signup form he needs to connect with his user --> this a login form we created that has validators on fields
	constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController,private auth: AuthServiceProvider)
    {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    popPage()
    {
        this.navCtrl.pop();
    }
  	ionViewDidLoad()
  	{
    	console.log('ionViewDidLoad LoginPage');
  	}

  	//login page requires from user email and password, after the user fill them the app check with server if the email
   // exists on server and check with server if the password match to user email

  	loginUser(): void
    {
        this.showLoading();
        if (this.loginForm.valid)
        {
            this.auth.login(this.loginForm.value).subscribe(allowed =>
            {
                if (allowed)
                {
                    this.navCtrl.setRoot(HomePage);
                    console.log("login");
                }
                else
                {
                    this.showError("Access Denied");
                    console.log("error");
                }
            },
            error =>
            {
                console.log("errorrr");
                this.showError(error);
            });

        }
        else
        {
            this.showError("Invalid Form details");
        }
    }
    showLoading()
    {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text)
    {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    //somtimes new users confused and goes to login page at start, we added a button that route them back to signup form
    goToSignup(): void
    {
        this.navCtrl.push(SignupPage);
    }

    // if user don't remember his password he has the option to reset his password with his email.
    goToResetPassword()
    {
        this.navCtrl.push(ForgotPasswordPage);
    }
}
