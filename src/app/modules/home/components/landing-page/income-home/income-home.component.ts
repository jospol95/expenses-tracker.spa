import {Component, Input, OnInit} from '@angular/core';
import {CalendarIncomeModel} from '../../../../calendar/models/calendar-income.model';
import {FacadeModel} from '../../../../../shared/models/facade.model';

@Component({
  selector: 'app-income-home',
  templateUrl: './income-home.component.html',
  styleUrls: ['./income-home.component.scss']
})
export class IncomeHomeComponent implements OnInit {
  @Input() model: CalendarIncomeModel[];
  @Input() accounts: FacadeModel[];
  public totalIncome = 0;
  public chartData = new Array<{ name: string, value: number }>();

  constructor() {
  }

  ngOnInit(): void {
    this.calculateTotalIncome();
    this.buildIncomeChartData();
  }


  private buildIncomeChartData() {
    this.accounts.forEach((a) => {
      const totalForAccount = this.getTotalForAccount(a.id);
      if (totalForAccount > 0) {
        this.chartData.push({
          name: a.name,
          value: totalForAccount
        });
      }
    });
  }

  private calculateTotalIncome() {
    this.model.forEach((i) => this.totalIncome += i.amount);
  }

  private getAccountName(accountId: number) {
    return this.accounts.find((a) => a.id === accountId).name;
  }

  private getTotalForAccount(accountId) {
    let totalForAccount = 0;
    this.model.filter((i) => i.accountId === accountId)
        .forEach((ia) => totalForAccount += ia.amount);
    return totalForAccount;
  }

}
