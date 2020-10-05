import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountModel} from '../../../../../../shared/models/account.model';

@Component({
  selector: '[app-user-account-item]',
  templateUrl: './user-account-item.component.html',
  styleUrls: ['./user-account-item.component.scss']
})
export class UserAccountItemComponent implements OnInit {

  @Input() model: AccountModel;
  @Input() index: number;
  private modelState = new AccountModel();
  @Output() public deleteEvent = new EventEmitter<[AccountModel, number]>();
  @Output() public updateEvent = new EventEmitter<[AccountModel, number, AccountModel]>();
  @Output() public createEvent = new EventEmitter<[AccountModel, number]>();

  public isEditMode: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isEditMode = this.model.id == null;
  }

  public doSaveOrUpdate() {
    if (this.model.id) {
      this.update();
    } else {
      this.save();
    }
  }

  public save() {
    // do some validation
    this.isEditMode = false;
    this.createEvent.emit([this.model, this.index]);
  }

  public update() {
    this.isEditMode = false;
    this.updateEvent.emit([this.model, this.index, this.modelState]);
  }

  public saveState() {
    this.modelState = {...this.model};
    this.isEditMode = true;
  }

  public resetModel() {
    if (!this.model.id) {
      this.isEditMode = false;
      this.deleteEvent.emit([this.model, this.index]);
    }
    this.model = {...this.modelState};
    this.isEditMode = false;
  }

}
