import { Injectable } from '@angular/core';
import { MechSetup } from './mech-setup';

@Injectable({
  providedIn: 'root'
})
export class MechOrderService {
  public AccountSize = 1000;
  public PercentRisked = 2;
  public Stock: string;
  public TimeInForce = 'GTC'; // DAY, GTC, EXT, GTC_EXT
  _TOSOrder: string;
  _OrderSize = 100;
  _ProfitTargetSize = { P: 0.25, P2: 0.25, D: 0.50 };

  constructor(public mechSetup: MechSetup, public mechSetupCamo: MechSetup) { }

  get OrderDirection() {
    return this.mechSetup.A < this.mechSetup.B;
  }

  get OrderDirectionMultiplier(): number {
    return this.OrderDirection ? 1 : -1;
  }

  get ThinkOrSwimOrderDirection(): string {
    return this.OrderDirection ? 'BUY +' : 'SELL -';
  }
  get ThinkOrSwimOppositeOrderDirection(): string {
    return !this.OrderDirection ? 'BUY +' : 'SELL -';
  }

  roundUp(n): number {
    return Number(Math.ceil(n).toFixed(2));
  }
  roundDown(n): number {
    return Number(Math.floor(n).toFixed(2));
  }

  get POrderSize(): number {
    return this.roundUp(this._OrderSize * this._ProfitTargetSize.P);
  }

  get P2OrderSize(): number {
    return this.roundUp(this._OrderSize * this._ProfitTargetSize.P2);
  }

  get DOrderSize(): number {
    return this.roundDown(this._OrderSize * this._ProfitTargetSize.D);
  }

  get InitialCost(): number {
    return this.mechSetup.X * this._OrderSize;
  }

  get MaxGain(): number {
    return ((this.mechSetup.P * this.POrderSize) + (this.mechSetup.P2 * this.P2OrderSize)
    + (this.mechSetup.D * this.DOrderSize) - (this.mechSetup.X * this._OrderSize)) * this.OrderDirectionMultiplier;
  }

  get MaxLoss(): number {
    return ((this.mechSetup.X - this.mechSetup.C) * this._OrderSize) * this.OrderDirectionMultiplier;
  }

  public set Quantity(quantity: number) {
    this._OrderSize = 2 * Math.round(quantity * 0.5);
  }

  public set Amount(amount: number) {
    const orderSize = 2 * Math.round((amount / this.mechSetup.X) * 0.5);
    this._OrderSize = parseFloat((orderSize).toFixed(0));
  }

  TradeProfitLoss() {
    const pl = {
      cost: this.InitialCost,
      profit: this.MaxGain,
      loss: this.MaxLoss,
      percentProfit: (this.MaxGain / this.InitialCost) * 100,
      percentLoss: (this.MaxLoss / this.InitialCost) * 100,
      riskReward: ((this.MaxGain / this.InitialCost) / (this.MaxLoss / this.InitialCost))
    };
    console.log(pl);
    return pl;
  }

  public get ThinkOrSwimOrder(): string {
    this.TradeProfitLoss();
    const orderString = `
    ${this.ThinkOrSwimOrderDirection}${this._OrderSize} ${this.Stock} @${this.mechSetup.X} LMT ${this.TimeInForce}
    ${this.ThinkOrSwimOppositeOrderDirection}${this.POrderSize} ${this.Stock} @${this.mechSetup.P} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this.POrderSize} ${this.Stock} STP ${this.mechSetup.C} ASK ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this.P2OrderSize} ${this.Stock} @${this.mechSetup.P2} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this.P2OrderSize} ${this.Stock} STP ${this.mechSetup.C} ASK ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this.DOrderSize} ${this.Stock} @${this.mechSetup.D} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this.DOrderSize} ${this.Stock} STP ${this.mechSetup.C} ASK ${this.TimeInForce} TRG BY OCO
    `;
    return orderString;
  }
}
