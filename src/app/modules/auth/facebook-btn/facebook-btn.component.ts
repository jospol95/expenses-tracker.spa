import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-facebook-btn',
  templateUrl: './facebook-btn.component.html',
  styleUrls: ['./facebook-btn.component.scss']
})
export class FacebookBtnComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
