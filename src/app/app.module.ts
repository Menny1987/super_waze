import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { OnboardingPage  } from '../pages/onboarding/onboarding';
import { IntroPage } from '../pages/intro/intro';
import { CartPage } from '../pages/cart/cart';
import { MapPage } from '../pages/map/map';
import { CheckoutPage } from '../pages/checkout/checkout';
import { AddshoppinglistPage } from '../pages/addshoppinglist/addshoppinglist';
import { GrocerylistPage } from '../pages/grocerylist/grocerylist';
import { ViewgrocerydetailsPage } from '../pages/viewgrocerydetails/viewgrocerydetails';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { NguiMapModule} from '@ngui/map';
import { TitleCasePipe } from '../pipes/title-case/title-case';
import { Stripe } from '@ionic-native/stripe';
import { HistoryPage } from '../pages/history/history';
import { NavigationPage } from '../pages/navigation/navigation';
import { ViewOrderPage } from '../pages/view-order/view-order';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    OnboardingPage,
    IntroPage,
    CartPage,
    GrocerylistPage,
    AddshoppinglistPage,
    ViewgrocerydetailsPage,
    TitleCasePipe,
    MapPage,
    CheckoutPage,
    HistoryPage,
    NavigationPage,
    ViewOrderPage,
    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB4dybe_UNx25JD1z9XDmt8tEay27kNCqY'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    OnboardingPage,
    AddshoppinglistPage,
    GrocerylistPage,
    IntroPage,
    CartPage,
    ViewgrocerydetailsPage,
    MapPage,
    CheckoutPage,
    HistoryPage,
    NavigationPage,
    ViewOrderPage,
    ForgotPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Stripe
  ]
})
export class AppModule {}
