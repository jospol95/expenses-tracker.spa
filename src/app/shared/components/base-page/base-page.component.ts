import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
