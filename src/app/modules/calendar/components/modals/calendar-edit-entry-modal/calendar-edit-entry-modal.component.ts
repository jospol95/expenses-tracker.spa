import {Component, Inject, OnInit} from '@angular/core';
import {EditEntryModalData} from '../../../interfaces/dialog-data';
import {CalendarService} from '../../../calendar.service';
import {CalendarIncomeModel} from '../../../models/calendar-income.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-edit-entry-modal',
  templateUrl: './calendar-edit-entry-modal.component.html',
  styleUrls: ['./calendar-edit-entry-modal.component.scss']
})
export class CalendarEditEntryModalComponent implements OnInit {

  public editMode = false;
  public model: CalendarIncomeModel;
  public initModel: CalendarIncomeModel;

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditEntryModalData,
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
    this.__service.getIncome(this.data.id).subscribe((result) => {
      this.model = {...result};
      this.initModel = {...result};
    });
  }

  public updateIncome() {
    const updateModel = {...this.model};
    this.__service.updateIncome(updateModel).subscribe(() => {
        this.model = {...updateModel};
        this.data.incomeChanged = { ...updateModel};
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
