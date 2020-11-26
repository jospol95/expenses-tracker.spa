import {Component, Injector, OnInit} from '@angular/core';
import {CategoryModel} from '../../../../../shared/models/category.model';
import {AuthorizationService} from '../../../../../shared/services/auth.service';
import {AccountService} from '../../../../../shared/services/accounts.service';
import {AccountModel} from '../../../../../shared/models/account.model';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {BasePageComponent} from '../../../../../shared/components/base-page/base-page.component';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent extends BasePageComponent implements OnInit {

  public accounts = new Array<AccountModel>();
  public userId: string;

  // private subscriptions =  new SubSink();

  public ngOnInit() {
    this.userId = this._authService.getUserId();
    this._accountsService.getAccounts(this.userId).subscribe(
      (accounts) => {
        this.accounts = [...accounts];
      });
  }


  // adds to the list
  public addNewAccount() {
    const category = new AccountModel();
    category.userId = this.userId;
    this.accounts.unshift(category);
  }

  // remove from the list
  public removeAccount(index: number) {
    this.accounts.splice(index, 1);
  }

  public createAccount($event: [AccountModel, number]) {
    const [newAccount, index] = $event;
    newAccount.userId = this._authService.getUserId();
    this._accountsService.createAccount(newAccount).subscribe(
      (result) => {
        this.accounts[index].id = result;
      },
      () => {
        this.showErrorPrompt();
        this.accounts.splice(index, 1);
      });
  }

  public updateAccount($event: [AccountModel, number, AccountModel]) {
    const [updatedAccount, index, categoryState] = $event;
    this._accountsService.updateAccount(updatedAccount).subscribe(
      (result) => {
        this.accounts[index] = updatedAccount;
      },
      () => {
        this.showErrorPrompt();
        this.accounts[index] = categoryState;
      });
  }

  public deleteAccount($event: [AccountModel, number]) {
    const [deletedAccount, index] = $event;
    if (deletedAccount.id) {
      swal.fire({
        icon: 'warning',
        text: 'Are you sure that you want to delete this account? ' +
          'Linked records to this account will be set to empty.',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
      }).then((response) => {
        this._accountsService.deleteAccount(deletedAccount.id).subscribe(
          (result) => {
            this.accounts.splice(index, 1);
          },
          () => {
            this.showErrorPrompt();
          });
      });
    } else {
      this.accounts.splice(index, 1);
    }
  }
}
