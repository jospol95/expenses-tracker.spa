import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-google-btn',
  templateUrl: './google-btn.component.html',
  styleUrls: ['./google-btn.component.scss']
})
export class GoogleBtnComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
