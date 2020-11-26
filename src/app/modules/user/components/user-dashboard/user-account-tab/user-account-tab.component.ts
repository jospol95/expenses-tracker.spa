import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AuthorizationService} from '../../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-account-tab',
  templateUrl: './user-account-tab.component.html',
  styleUrls: ['./user-account-tab.component.scss']
})
export class UserAccountTabComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  public goToAuthAccount() {
    window.location.href = environment.auth_spa_url + 'account';
  }

  public killSessionAndLogOut(){
    this.authService.killSession();
  }

}
