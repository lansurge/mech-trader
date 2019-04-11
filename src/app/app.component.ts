import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { MechSetupFormComponent } from './components/mech-setup-form/mech-setup-form.component';
import { TradingviewWidgetComponent } from './components/tradingview-widget/tradingview-widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mech-Trader';

  constructor() {
  }
}
