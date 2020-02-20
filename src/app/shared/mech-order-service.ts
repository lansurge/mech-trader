import { Injectable } from '@angular/core';
import { MechSetup } from './mech-setup';

class ProfitTargetOrderSize {
  P: number;
  P2: number;
  D: number;

  constructor(p: number = 0.5, p2: number = 0.25, d: number = 0.25) {
    this.P = p;
    this.P2 = p2;
    this.D = d;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MechOrderService {
  public AccountSize = 1000;
  public PercentRisked = 2;
  public Stock: string;
  public TimeInForce = 'GTC'; // DAY, GTC, EXT, GTC_EXT
  _TOSOrder: string;

  _OrderSize = 1;
  _ProfitTargetSize: ProfitTargetOrderSize;
  _ClampTo = 2;
  _TickSize = 0.25;


  constructor(public mechSetup: MechSetup, public mechSetupCamo: MechSetup) {
    this.ProfitTargetSize = new ProfitTargetOrderSize();
    this.mechSetup.ClampTo = this._ClampTo;
    this.mechSetup.TickSize = this._TickSize;
  }

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
  get ThinkOrSwimCStopOutDirection(): string {
    return this.OrderDirection ? `BELOW` : `ABOVE`;
  }
  get ThinkOrSwimCStopOut(): string {
    return this.OrderDirection ? `${this.mechSetup.CStop(-1)}` : `${this.mechSetup.CStop(1)}`;
  }

  set ProfitTargetSize(p: ProfitTargetOrderSize) {
    this._ProfitTargetSize = p;
  }

  roundPrecision(value, precision): number {
    const multiplier = Math.pow(10, precision || 0);
    return Number(Math.round(value * multiplier) / multiplier);
  }

  roundUp(n): number {
    return Number(Math.ceil(n).toFixed(this._ClampTo));
  }
  roundDown(n): number {
    return Number(Math.floor(n).toFixed(this._ClampTo));
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
    this._OrderSize = 1;//2 * Math.round(quantity * 0.5);
  }

  public set Amount(amount: number) {
    const orderSize = 2 * Math.round((amount / this.mechSetup.X) * 0.5);
    this._OrderSize = 1;//parseFloat((orderSize).toFixed(0));
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

  public get ThinkOrSwimOrder_rABC(): string {
    this.TradeProfitLoss();
    const orderString = `
    ${this.ThinkOrSwimOrderDirection}${this._OrderSize} ${this.Stock} @${this.mechSetup.X} LMT ${this.TimeInForce} WHEN ${this.Stock} MARK AT OR ABOVE ${this.mechSetup.X} CANCEL IF ${this.Stock} MARK AT OR ${this.ThinkOrSwimCStopOutDirection} ${this.ThinkOrSwimCStopOut}
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize} ${this.Stock} @${this.mechSetup.P2} LMT ${this.TimeInForce} TRG BY OCO
    ${this.ThinkOrSwimOppositeOrderDirection}${this._OrderSize} ${this.Stock} STP ${this.ThinkOrSwimCStopOut} MARK ${this.TimeInForce} TRG BY OCO
    `;
    //BUY +1 /GCG20:XCEC @1558.80 LMT GTC WHEN /GCG20:XCEC MARK AT OR ABOVE 1558.80
    //BUY +1 /GCG20:XCEC @1558.80 LMT WHEN /GCG20:XCEC MARK AT OR ABOVE 1558.80 CANCEL IF /GCG20:XCEC MARK AT OR BELOW 1556.40
    return orderString;
  }

  public get ToChatText(): string {
    this.TradeProfitLoss();
    // tslint:disable-next-line: max-line-length
    const chatTextString = `A=${this.mechSetup.A}, B=${this.mechSetup.B}, C=${this.mechSetup.C}, X=${this.mechSetup.X}, P=${this.mechSetup.P}, P2=${this.mechSetup.P2}, D=${this.mechSetup.D}`;
    return chatTextString;
  }
}
