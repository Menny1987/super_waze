import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HistoryPage } from '../history/history';
import { MapPage } from "../map/map";

@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
})
export class CheckoutPage
{
    public signupForm;
    is_valid_card_number:boolean;
    is_valid_expiry:boolean;
    is_valid_cvv:boolean;
    loading:any;

    //constructor has variables for checkout payment form --> required fields for every var with different properties for every field
    constructor(public navCtrl: NavController, public navParams: NavParams,private stripe: Stripe,public formBuilder: FormBuilder,public toast:ToastController,public loadingCtrl: LoadingController,private auth: AuthServiceProvider)
    {
        this.signupForm = formBuilder.group({
            cardholdername: ['', Validators.compose([Validators.minLength(4), Validators.required])],
            cardnumber: ['', Validators.compose([Validators.required, Validators.required])],
            expirymonth: ['', Validators.compose([Validators.minLength(2), Validators.required])],
            expiryyear: ['', Validators.compose([Validators.minLength(4), Validators.required])],
            cvv: ['', Validators.compose([Validators.maxLength(3), Validators.required])],
            shipping: ['', Validators.compose([Validators.minLength(10), Validators.required])]
        });

        this.is_valid_card_number = true;
        this.is_valid_cvv = true;
        this.is_valid_expiry = true;
    }

    ionViewDidLoad()
    {
        console.log('ionViewDidLoad CheckoutPage');
    }

    // validation that checks if card number user entered is correct with the right pattern
    validateCardNumber()
    {
        this.stripe.validateCardNumber(this.signupForm.value.cardnumber)
        .then(res=>
        {
            this.is_valid_card_number = true;
        })
        .catch(err=>
        {
            this.is_valid_card_number = false;
        });
    }

    //validate the 3 numbers behind card --> if user entered it correctly

    validateCVC()
    {
        this.stripe.validateCVC(this.signupForm.value.cvv)
        .then(res=>
        {
            this.is_valid_cvv = true;
        })
        .catch(err=>
        {
            this.is_valid_cvv = false;
        });
    }


    // checks if user entered expiry date in the correct pattern
    validateExpiryDate()
    {
        this.stripe.validateExpiryDate(this.signupForm.value.expirymonth,this.signupForm.value.expiryyear)
        .then(res=>
        {
            this.is_valid_expiry = true;
        })
        .catch(err=>
        {
            this.is_valid_expiry = false;
        });
    }


    // confirm method comes in a shape of button --> checks if every field is in the correct pattern
   // gets the input and save the cart order into the server and send it directly to history order
    confirm()
    {

        if(this.signupForm.valid)
        {
            this.loading = this.loadingCtrl.create();
            this.loading.present();

            this.validateCardNumber();
            this.validateExpiryDate();
            this.validateCVC();

            var userid = JSON.parse(localStorage.getItem("user_data"))[0]['idetity'];

            let card =
            {
                card_number: this.signupForm.value.cardnumber,
                expiry_month_year: this.signupForm.value.expiryyear,
                cvv: this.signupForm.value.cvv,
                shipping_address:this.signupForm.value.shipping,
                user_id:userid,
                card_holder_name:this.signupForm.value.cardholdername,
                stripe_token:"token-123123"
            };

            var item_to_ship = [];
            this.auth.requestGet("category_list.php")
            .then(res=>
            {
                for(var x in res)
                {
                    var category_name = "category_"+res[x]['category_id'];

                    if(localStorage.getItem(category_name)!=undefined || localStorage.getItem(category_name)!=null)
                    {
                        if(JSON.parse(localStorage.getItem(category_name)).length>0)
                        {
                            item_to_ship.push(localStorage.getItem(category_name));
                            localStorage.removeItem(category_name);
                        }
                    }
                }

                card['item'] = JSON.stringify(item_to_ship);

                console.log(card);

                this.auth.requestPost("add_order.php",card)
                .then(res=>
                {
                    if(res['success'])
                    {
                        this.loading.dismiss();
                        this.navCtrl.setRoot(MapPage);
                    }
                });
            });
        }
        else
        {
            let toasta = this.toast.create({
            message: 'Please fill the form.!',
            duration: 2000,
            position: 'top'
            });
            toasta.present();
        }
    }
}
