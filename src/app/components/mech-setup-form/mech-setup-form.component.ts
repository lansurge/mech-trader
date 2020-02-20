import { Component, OnInit } from '@angular/core';
import { MechOrderService } from '../../shared/mech-order-service';

@Component({
  selector: 'mech-setup-form',
  templateUrl: './mech-setup-form.component.html',
  styleUrls: ['./mech-setup-form.component.scss']
})
export class MechSetupFormComponent implements OnInit {
  public accountSize: Number;
  public stockName = '/ESH20:XCME'; // 'SPY';
  public abc = '3270.75,3278,3274'; // '46.08, 61.58, 52.28'; // '169.50, 197.69, 184.58'; // '286.70, 287.98, 287.31';
  public abcCamo = '169.50, 197.69, 184.58';
  public quantity = 100;
  public amount = 10000;
  public tosOrder: string;
  public toChat: string;

  constructor(
    public mechOrderService: MechOrderService) {
      this.tosOrder = this.mechOrderService.ThinkOrSwimOrder;
      this.toChat = this.mechOrderService.ToChatText;
    }

  ngOnInit() {
  }

  public getMechSetup(): void {
    if (this.stockName !== '' && this.abc !== '') {
      this.mechOrderService.Stock = this.stockName;
      this.mechOrderService.Quantity = this.quantity;
      const mechArray: string[] = this.parseABC(this.abc);
      this.mechOrderService.mechSetup.A = +mechArray[0];
      this.mechOrderService.mechSetup.B = +mechArray[1];
      this.mechOrderService.mechSetup.C = +mechArray[2];
      this.mechOrderService.Amount = this.amount;
      this.tosOrder = this.mechOrderService.ThinkOrSwimOrder_rABC; //this.mechOrderService.ThinkOrSwimOrder;
      this.toChat = this.mechOrderService.ToChatText;
    }
  }

  parseABC(text: string): string[] {
    debugger;
    const str = this.abc.replace('P2', 'Q').trim().split(/[^0-9.]+/).filter(function(entry) { return entry.trim() != ''; });
    return str;
  }

}
