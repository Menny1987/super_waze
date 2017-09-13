import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OnboardingPage  } from '../pages/onboarding/onboarding';
import { HistoryPage } from '../pages/history/history';
import { Events } from 'ionic-angular';
import { NavigationPage } from '../pages/navigation/navigation';
import { MapPage } from '../pages/map/map';
@Component({
    templateUrl: 'app.html'
})
export class MyApp
{
    rootPage:any = null;
    pages: Array<{title: string, component: any}>;
    username = '';
    email = '';
    //userData=JSON.parse(localStorage.getItem("user_data"));
    constructor(public auth:AuthServiceProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events)
    {
        events.subscribe('menu:clicked', (res) =>
        {
            let info = JSON.parse(localStorage.getItem("user_data"));
            console.log(info);
            if(info!=null)
            {
                this.username = info[0]['CustName']+" "+info[0]['LastName'];
                this.email = info[0]['email'];
            }
            else
            {
                this.username = '';
                this.email = '';
            }

        });


        this.pages =
        [
            {
                title:"דף הבית",
                component:HomePage
            },
            {
                title:"היסטוריית קניות",
                component:HistoryPage
            }
        ];



        platform.ready().then(() =>
        {
            statusBar.styleDefault();
            splashScreen.hide();

            if(localStorage.getItem("user_data")!=null)
            {
                this.rootPage = HomePage;
            }
            else
            {
                if(localStorage.getItem("fresh_app")==null)
                {
                    localStorage.setItem("fresh_app","false");
                    this.rootPage = IntroPage;
                }
                else
                {
                    this.rootPage = OnboardingPage;
                }
            }
        });
    }
    openPage(page)
    {
        this.rootPage = page.component;
    }
    public logout()
    {
        localStorage.removeItem("user_data");
        this.events.publish('menu:logout', {});
    }
}
