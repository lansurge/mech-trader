import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-tradingview-widget',
  templateUrl: './tradingview-widget.component.html',
  styleUrls: ['./tradingview-widget.component.scss']
})
export class TradingviewWidgetComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    new TradingView.widget(
      {
        "width": 980,
        "height": 610,
        "symbol": "ETHUSDT",
        "interval": "D",
        "timezone": "America/New_York",
        "theme": "Dark",
        "style": "0",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_657e1"
      });

    TradingView.widget.subscribeToQuote();
  }

}
