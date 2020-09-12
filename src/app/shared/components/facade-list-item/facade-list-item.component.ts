import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FacadeModel} from '../../models/facade.model';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: '[app-facade-list-item]',
  templateUrl: './facade-list-item.component.html',
  styleUrls: ['./facade-list-item.component.scss']
})
export class FacadeListItemComponent implements OnInit {

  @Input() model: CategoryModel;
  @Input() index: number;
  @Input() hasValue: boolean;
  @Input() value: any;
  private modelState = new CategoryModel();
  @Output() public deleteEvent = new EventEmitter<number>();
  @Output() public updateEvent = new EventEmitter<CategoryModel>();
  @Output() public createEvent = new EventEmitter<[CategoryModel, number]>();

  public isEditMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  public save() {
    // do some validation
    this.createEvent.emit([this.model, this.index]);
  }

  public saveState(){
    this.modelState = {...this.model};
    this.isEditMode = true;
  }

  public resetModel() {
    this.model = {...this.modelState};
    this.isEditMode = false;
  }

}
