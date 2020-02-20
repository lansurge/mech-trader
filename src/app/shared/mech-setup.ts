export class MechSetup {
  public TF: TimeFrame;
  public A: number;
  public B: number;
  public C: number;
  _D: number;
  _X: number;
  _P: number;
  _P2: number;
  _ClampTo = 2;
  _TickSize = 0.01;

  constructor() {
    this.A = 0;
    this.B = 0;
    this.C = 0;
    this._D = 0;
    this._X = 0;
    this._P = 0;
    this._P2 = 0;
  }

  set ClampTo(c) {
    this._ClampTo = c;
  }
  set TickSize(t) {
    this._TickSize = t;
  }

  roundToTickSize(num) {
    const diff = num % this._TickSize;
    return diff > this._TickSize / 2 ? (num - diff + this._TickSize) : num - diff;
  }

  OneOff(): number {
    const multi = Math.pow(this._ClampTo, 10);
    console.log('multi', multi)
    return Math.round(1 * multi);
  }

  round(n): string {
    const diff = n % this._TickSize;
    const newN = diff > this._TickSize / 2 ? (n - diff + this._TickSize) : n - diff;
    return (Math.round(newN * 1000) / 1000).toFixed(this._ClampTo);
  }

  get X(): number {
    return Number(this.round(this.C + 0.25 * (this.B - this.A)));
  }
  get P(): number {
    return Number(this.round(this.C + 0.5 * (this.B - this.A)));
  }
  get P2(): number {
    return Number(this.round(this.C + 0.75 * (this.B - this.A)));
  }
  get D(): number {
    return Number(this.round(this.C + (this.B - this.A)));
  }
  CStop(multi: number = -1): number {
    return Number(this.round(this.C + (this._TickSize * multi)));
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
