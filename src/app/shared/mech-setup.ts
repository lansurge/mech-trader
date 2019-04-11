export class MechSetup {
  public TF: TimeFrame;
  public A: number;
  public B: number;
  public C: number;
  _D: number;
  _X: number;
  _P: number;
  _P2: number;

  constructor() {
    this.A = 0;
    this.B = 0;
    this.C = 0;
    this._D = 0;
    this._X = 0;
    this._P = 0;
    this._P2 = 0;
  }

  round(n, d) {
    return (Math.round(n * 1000) / 1000).toFixed(2);
  }

  get X() {
    return this.round(this.C + 0.25 * (this.B - this.A), 2);
  }
  get P() {
    return this.round(this.C + 0.5 * (this.B - this.A), 2);
  }
  get P2() {
    return this.round(this.C + 0.75 * (this.B - this.A), 2);
  }
  get D() {
    return this.round(this.C + (this.B - this.A), 2);
  }
}

enum TimeFrame {
  ONE_MINUTE = '1m',
  FIVE_MINUTE = '2m',
  ONE_HOUR = '1h',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1m'
}
