import {Component, OnInit} from '@angular/core';
import {AuthRegisterModel} from '../../../shared/models/auth-register.model';
import {AuthLoginModel} from '../../../shared/models/auth-login.model';
import {AuthorizationService} from '../../../shared/services/auth.service';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from '@angular/router';
import {noop} from 'rxjs';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  public model = new AuthLoginModel();

  public get isValidModel() {
    return this.model.username != null && this.model.password != null;
  }

  constructor(private readonly _authService: AuthorizationService, private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  public login() {
    this._authService.tryLogin({...this.model});
    if (!this._authService.isLoggedIn) {
      swal.fire({
        title: 'Invalid credentials',
        text: 'Please verify your username/password and try again.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    else{
      console.log('Got it!');
      this.router.navigate(['home']).then((r) => noop());
    }
  }

}
