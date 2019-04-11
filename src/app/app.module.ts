import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TradingviewWidgetComponent } from './components/tradingview-widget/tradingview-widget.component';
import { MechSetupFormComponent } from './components/mech-setup-form/mech-setup-form.component';

import { MechSetup } from './shared/mech-setup';

@NgModule({
  declarations: [
    AppComponent,
    TradingviewWidgetComponent,
    MechSetupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
    TradingviewWidgetComponent,
    MechSetupFormComponent],
  providers: [MechSetup],
  bootstrap: [AppComponent]
})
export class AppModule { }
