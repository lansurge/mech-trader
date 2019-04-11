import { Injectable } from '@angular/core';
import { MechSetup } from './mech-setup';

@Injectable({
  providedIn: 'root'
})
export class MechOrderService {
  public AccountSize: Number = 10000;
  public PercentRisked: Number = 2;
  public Stock: string;
  public TimeInForce = 'GTC'; // DAY, GTC, EXT, GTC_EXT
  _TOSOrder: string;
  _OrderSize: Number = 100;
  _ProfitTargetSize: object = {
    
  };

  constructor(public mechSetup: MechSetup) { }

  get OrderDirection() {
    return this.mechSetup.A < this.mechSetup.B;
  }

  get ThinkOrSwimOrderDirection(): string {
    return this.OrderDirection ? 'BUY +' : 'SELL -';
  }
  get ThinkOrSwimOppositeOrderDirection(): string {
    return !this.OrderDirection ? 'BUY +' : 'SELL -';
  }

  get POrderSize() {
    return this._OrderSize / 4;
  }

  get P2OrderSize() {
    return this._OrderSize / 2;
  }

  get DOrderSize() {
    return this._OrderSize / 2;
  }

  public set Quantity(quantity: Number) {
    this._OrderSize = 2 * Math.round(quantity / 2);
  }

  public set Amount(amount: Number) {
    console.log(amount);
    console.log(this.mechSetup.X);
    const orderSize = 2 * Math.round((amount / this.mechSetup.X) / 2);
    console.log(orderSize);
    this._OrderSize = (orderSize).toFixed(0);
  }

  public get ThinkOrSwimOrder(): string {
    const orderString = `
    ${this.ThinkOrSwimOrderDirection}${this._OrderSize} ${this.Stock} @${this.mechSetup.X} LMT ${this.TimeInForce}
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize / 2} ${this.Stock} @${this.mechSetup.P} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize / 2} ${this.Stock} STP ${this.mechSetup.C} ASK ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize / 4} ${this.Stock} @${this.mechSetup.P2} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize / 4} ${this.Stock} STP ${this.mechSetup.C} ASK ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize / 4} ${this.Stock} @${this.mechSetup.D} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize / 4} ${this.Stock} STP ${this.mechSetup.C} ASK ${this.TimeInForce} TRG BY OCO
    `;
    return orderString;
  }
}
