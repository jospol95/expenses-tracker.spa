import {Component, Inject, OnInit} from '@angular/core';
import {EditEntryModalData} from '../../../interfaces/dialog-data';
import {CalendarService} from '../../../calendar.service';
import {CalendarIncomeModel} from '../../../models/calendar-income.model';
import {CalendarExpenseModel} from '../../../models/calendar-expense.model';
import {EditExpenseDialogData} from '../../../interfaces/edit-expense-dialog-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-edit-expense-modal',
  templateUrl: './calendar-edit-expense-modal.component.html',
  styleUrls: ['./calendar-edit-expense-modal.component.scss']
})
export class CalendarEditExpenseModalComponent implements OnInit {

  public model: CalendarExpenseModel;
  public editMode = false;

  private initModel: CalendarExpenseModel;

  constructor(
    public dialogRef: MatDialogRef<CalendarEditExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditExpenseDialogData,
    private readonly __service: CalendarService,
  ) {
    this.model = new CalendarIncomeModel();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit() {
    // get this icome details
    console.log(this.data.id);
    this.__service.getExpense(this.data.id).subscribe((result) => {
      this.model = {...result};
      this.initModel = {...result};
    });
  }

  public updateExpense() {
    const updateModel = {...this.model};
    this.__service.updateExpense(updateModel).subscribe(() => {
        this.model = {...updateModel};
        this.data.expenseChanged = {...updateModel};
        this.editMode = false;
      }, (error) => {
        this.model = {...this.initModel};
      }
    );
  }

  public cancelEvent() {
    this.model = {...this.initModel};
    this.editMode = false;

  }
}
