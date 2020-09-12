import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {CategoryModel} from '../../../../../../shared/models/category.model';
import {FacadeModel} from '../../../../../../shared/models/facade.model';

@Component({
  selector: '[app-user-categories-list-item]',
  templateUrl: './user-categories-list-item.component.html',
  styleUrls: ['./user-categories-list-item.component.scss']
})
export class UserCategoriesListItemComponent implements OnInit {

  @Input() model: CategoryModel;
  @Input() index: number;
  private modelState = new CategoryModel();
  @Output() public deleteEvent = new EventEmitter<[CategoryModel, number]>();
  @Output() public updateEvent = new EventEmitter<[CategoryModel, number, CategoryModel]>();
  @Output() public createEvent = new EventEmitter<[CategoryModel, number]>();

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
