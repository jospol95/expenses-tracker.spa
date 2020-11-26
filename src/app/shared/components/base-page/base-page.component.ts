import {Component, Injector, OnInit} from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {ServiceInjector} from '../../services/service-injector.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends ServiceInjector {

  public userId: string;
  constructor(private readonly injector: Injector) {
    super(injector);
    this.userId = this._authService.getUserId();
  }

  public showErrorPrompt(title: string = null, text: string = null) {
    swal.fire({
      title: title ? title : 'An error occurred',
      text: text ? text : 'Please try again',
      icon: 'error',
    });
  }

  public showSuccessPrompt(title: string = null, text: string = null) {
    swal.fire({
      title: title ? title : 'Success',
      text ,
      icon: 'success',
    });
  }

  public showAlert() {
    swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }

}
