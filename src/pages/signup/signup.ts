import { Component } from '@angular/core';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage
{
	public signupForm;
    loading: any;
    createSuccess = false;

    // constructor has fields for signup form user will fill to create his user --> with validators with different properties

	constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,private auth: AuthServiceProvider)
	{
		this.signupForm = formBuilder.group({
            firstname: ['', Validators.compose([Validators.minLength(2), Validators.required])],
            lastname: ['', Validators.compose([Validators.minLength(2), Validators.required])],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            phone: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })
    }
    popPage()
    {
        this.navCtrl.pop();
    }

  	ionViewDidLoad()
  	{
    	console.log('ionViewDidLoad SignupPage');
  	}


  	// when user fill the fields correctly the system checks info and then push it to server
    // if user fill everything correctly he will get success message and new user created
   // if not, user will get an error message
  	signupUser()
    {
        if (this.signupForm.valid)
        {
            console.log(this.signupForm.value);

            this.auth.requestPost("register.php",this.signupForm.value)
          .then(res=>
          {
              if(res['success'])
              {
                let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: "Account created.!",
                    buttons: ['OK']
                });
                alert.present(prompt);

                this.navCtrl.push(LoginPage);
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

            /*this.auth.register(this.signupForm.value).subscribe(success =>
            {
              console.log(success);
              if (success)
              {
                  this.createSuccess = true;
                  this.showPopup("Success", "Account created.");
                  console.log("register");
              }
              else
              {
                 this.showPopup("Error", "Problem creating account.");
                 console.log("error");
              }
            },
            error =>
            {
              this.showPopup("Error", error);
              console.log("err");
            });*/
        }
        else
        {

        }
    }
    showPopup(title, text)
    {
        let alert = this.alertCtrl.create({
              title: title,
              subTitle: text,
              buttons: [
              {
                  text: 'OK',
                  handler: data =>
                  {
                      if (this.createSuccess)
                      {
                          this.navCtrl.popToRoot();
                      }
                  }
              }
              ]
          });
        alert.present();
    }
}
