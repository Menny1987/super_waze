import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController,ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';


/**
 *
 */
export class User
{
    name: string;
    email: string;

    constructor(name: string, email: string)
    {
        this.name = name;
        this.email = email;
    }
}


@Injectable()
export class AuthServiceProvider
{
    currentUser: User;
    api_url: string;
    loading : any;
    toast : any;

    // we put inside the constructor server url so it gets from there the database
    constructor(public http: Http,public loadingCtrl:LoadingController,private toastCtrl: ToastController)
    {
        this.api_url = "http://138.197.93.114/";

    }

    //connect with right email and password to app
    public login(credentials)
    {
        if (credentials.email === null || credentials.password === null)
        {
            return Observable.throw("Please insert credentials");
        }
        else
        {
            return Observable.create(observer =>
            {
                this.requestPost("login.php",credentials)
                .then(res=>
                {
                    if(res['success'])
                    {
                        var obj = res['extras']['data'];
                        localStorage.setItem("user_data",JSON.stringify(obj));
                        this.currentUser = new User(credentials.username, credentials.username);
                        observer.next(true);
                    }
                    else
                    {
                        observer.next(false);
                    }
                    observer.complete();
                });
            });
        }
    }

    requestPost(methodName,data)
    {
        return new Promise(resolve =>
        {
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });

            let options = new RequestOptions({
                headers: headers
            });

            let body = "";

            for (var key in data)
            {
                body += key+"="+data[key]+"&";
            }
            this.http.post(this.api_url+methodName, body, options)
            .subscribe(data =>
            {
                console.log(data['_body']);
                resolve(JSON.parse(data['_body']));
            },
            error =>
            {
                resolve({"error":"404"});
            });
        });
    }

    public register(credentials)
    {
        if (credentials.email === null || credentials.password === null)
        {
            return Observable.throw("Please insert credentials");
        }
        else
        {
            console.log(credentials);
            // At this point store the credentials to backend!
            return Observable.create(observer =>
            {
                console.log(observer);
                this.requestPost("register.php",credentials);
                observer.next(true);
                observer.complete();
            });
        }
    }

    public getUserInfo() : User
    {
        return this.currentUser;
    }

    public logout()
    {
        return Observable.create(observer =>
        {
            localStorage.removeItem("user_data");
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }

    loadingShow(spinner="crescent",content="Please wait...",showBackdrop=true)
    {
        //Possible value of spinner argument => ios,ios-small,bubbles,circles,crescent,dots

        this.loading = this.loadingCtrl.create({
            spinner: spinner,
            content: content,
            showBackdrop: showBackdrop
        });
        this.loading.present();
    }

    loadingHide()
    {
        this.loading.dismiss();
    }

    requestGet(method_name)
    {
        return new Promise(resolve =>
        {
            this.http.get(this.api_url+method_name)
            .map(res => res.json())
            .subscribe(data =>
            {
                resolve(data);
            });
        });
    }

    requestGetFullUrl(url)
    {
        return new Promise(resolve =>
        {
            this.http.get(url)
            .map(res => res.json())
            .subscribe(data =>
            {
                resolve(data);
            });
        });
    }
    showToast()
    {
        this.toast = this.toastCtrl.create({
            message: 'Retrieving...',
            position: 'middle'
        });

        this.toast.present();
    }

    showToastAlert(message)
    {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });

        this.toast.present();
    }

    hideToast()
    {
        this.toast.dismiss();
    }


}
