import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {
  position:string
  displayPosition: boolean
  value1: string;
  value6: string;
  constructor() { }

  ngOnInit(): void {
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
