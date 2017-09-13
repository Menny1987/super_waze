import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage
{
	public loginForm;
    loading: Loading;
    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController,private auth: AuthServiceProvider)
  	{
  		this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        });
  	}

  	ionViewDidLoad()
  	{
    	console.log('ionViewDidLoad ForgotPasswordPage');
  	}

  	// reset password form that checks first if user email exist on server, if exists prompt a message
   // of success, else will prompt an error message that the user doesn't exist.
  	resetPassword()
  	{
  		console.log(this.loginForm.value.email);
  		if (this.loginForm.valid)
        {
          this.auth.requestPost("forgot_password.php",{email:this.loginForm.value.email})
          .then(res=>
          {
              console.log(res);
              if(res['success'])
              {
                let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: res['extras']['msg'],
                    buttons: ['OK']
                });
                alert.present(prompt);
              }
              else
              {
                let alert = this.alertCtrl.create({
                    title: 'Fail',
                    subTitle: res['extras']['msg'],
                    buttons: ['OK']
                });
                alert.present(prompt);
              }
          });
        }
        else
        {
        	this.showError("Invalid Form details");
        }
  	}
  	showError(text)
    {
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}
