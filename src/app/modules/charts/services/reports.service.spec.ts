import { TestBed } from '@angular/core/testing';

import { BudgetChartService } from './budget-chart.service';

describe('ReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetChartService = TestBed.get(BudgetChartService);
    expect(service).toBeTruthy();
  });
});
