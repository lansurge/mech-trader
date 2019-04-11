import { Component, OnInit } from '@angular/core';
import { MechOrderService } from '../../shared/mech-order-service';

@Component({
  selector: 'mech-setup-form',
  templateUrl: './mech-setup-form.component.html',
  styleUrls: ['./mech-setup-form.component.scss']
})
export class MechSetupFormComponent implements OnInit {
  public accountSize: Number;
  public stockName = 'AAPL'; // 'SPY';
  public abc = '169.50, 197.69, 184.58'; // '286.70, 287.98, 287.31';
  public quantity = 100;
  public amount = 10000;
  public tosOrder: string;

  constructor(
    public mechOrderService: MechOrderService) {
      this.tosOrder = this.mechOrderService.ThinkOrSwimOrder;
    }

  ngOnInit() {
  }

  public getMechSetup(): void {
    if (this.stockName !== '' && this.abc !== '') {
      this.mechOrderService.Stock = this.stockName;
      this.mechOrderService.Quantity = this.quantity;
      const mechArray: string[] = this.abc.split(',', 3);
        this.mechOrderService.mechSetup.A = +mechArray[0];
        this.mechOrderService.mechSetup.B = +mechArray[1];
        this.mechOrderService.mechSetup.C = +mechArray[2];

        this.mechOrderService.Amount = this.amount;

        console.log('mech setup:', this.mechOrderService.mechSetup.A, this.mechOrderService.mechSetup.B, this.mechOrderService.mechSetup.C);
        console.log('X, P, P2', this.mechOrderService.mechSetup.X, this.mechOrderService.mechSetup.P2, this.mechOrderService.mechSetup.P2);
        console.log(this.mechOrderService.ThinkOrSwimOrder);
        this.tosOrder = this.mechOrderService.ThinkOrSwimOrder;
    }
  }

}
