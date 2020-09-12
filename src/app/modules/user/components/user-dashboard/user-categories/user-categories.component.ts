import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../../../shared/services/auth.service';
import {CategoriesService} from '../../../../../shared/services/categories.service';
import {CategoryModel} from '../../../../../shared/models/category.model';
import {FacadeModel} from '../../../../../shared/models/facade.model';
import swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-user-categories',
  templateUrl: './user-categories.component.html',
  styleUrls: ['./user-categories.component.scss']
})
export class UserCategoriesComponent implements OnInit, OnDestroy {

  public categories = new Array<CategoryModel>();
  public userId: string;

  // private subscriptions =  new SubSink();

  constructor(private readonly _authService: AuthorizationService,
              private readonly _categoryService: CategoriesService) {
  }

  public ngOnInit() {
    this.userId = this._authService.getLoggedUserModel().userId;
    this._categoryService.getCategories(this.userId).subscribe(
      (categories) => {
        this.categories = [...categories];
      });
  }

  public ngOnDestroy() {
    // unsubscribe
  }

  // adds to the list
  public addNewCategory() {
    const category = new CategoryModel();
    category.userId = this.userId;
    this.categories.unshift(category);
  }

  // remove from the list
  public removeCategory(index: number) {
    this.categories.splice(index, 1);
  }

  public createCategory($event: [CategoryModel, number]) {
    const [newCategory, index] = $event;
    newCategory.userId = this._authService.getUserId();
    this._categoryService.createAccount(newCategory).subscribe(
      (result) => {
        this.categories[index].id = result;
      },
      () => {
        console.log('An error occurred, try again!');
        this.categories.splice(index, 1);
      });
  }

  public updateCategory($event: [CategoryModel, number, CategoryModel]) {
    const [updatedCategory, index, categoryState] = $event;
    this._categoryService.updateAccount(updatedCategory).subscribe(
      (result) => {
        this.categories[index] = updatedCategory;
      },
      () => {
        console.log('An error occurred, try again!');
        this.categories[index] = categoryState;
      });
  }

  public deleteCategory($event: [CategoryModel, number]) {
    const [deletedCategory, index] = $event;
    console.log($event);
    if (deletedCategory.id) {
      swal.fire({
        icon: 'warning',
        text: 'Are you sure that you want to delete this category? ' +
          'Linked records to this category will be set to empty.',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
      }).then((response) => {
        this._categoryService.deleteAccount(deletedCategory.id).subscribe(
          (result) => {
            this.categories.splice(index, 1);
          },
          () => {
            console.log('An error occurred, try again!');
          });
      });
    } else {
      this.categories.splice(index, 1);
    }
  }

  private mapFacadeToCategories(facadeModelArray: FacadeModel[], userId: string) {
    const categories = new Array<CategoryModel>();
    // facadeModelArray.forEach((facade) => {
    //   categories.push({
    //     userId,
    //     name: facade.name,
    //     description: facade.description,
    //     id: facade.id,
    //     budgetAssigned: facade.budgetAssigned
    //   });
    // });

    // return categories;
  }


}
