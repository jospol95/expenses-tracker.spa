import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../../../shared/services/auth.service';
import {CategoriesService} from '../../../../../shared/services/categories.service';
import {CategoryModel} from '../../../../../shared/models/category.model';
import {FacadeModel} from '../../../../../shared/models/facade.model';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {ServiceInjector} from '../../../../../shared/services/service-injector.service';
import {BasePageComponent} from '../../../../../shared/components/base-page/base-page.component';


@Component({
  selector: 'app-user-categories',
  templateUrl: './user-categories.component.html',
  styleUrls: ['./user-categories.component.scss']
})
export class UserCategoriesComponent extends BasePageComponent implements OnInit, OnDestroy {

  public categories = new Array<CategoryModel>();
  public userId: string;

  // private subscriptions =  new SubSink();


  public ngOnInit() {
    this.userId = this._authService.getUserId();
    this._categoriesService.getCategories(this.userId).subscribe(
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
    this._categoriesService.createAccount(newCategory).subscribe(
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
    this._categoriesService.updateAccount(updatedCategory).subscribe(
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
        this._categoriesService.deleteAccount(deletedCategory.id).subscribe(
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
