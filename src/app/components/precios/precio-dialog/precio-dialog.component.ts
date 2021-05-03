import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-precio-dialog',
  templateUrl: './precio-dialog.component.html',
  styleUrls: ['./precio-dialog.component.css']
})
export class PrecioDialogComponent implements OnInit {
  @Output() verPrecio = new EventEmitter<any>()
  displayPosition: boolean;
  position: string;

  constructor() { }

  ngOnInit(): void {
  }

  showPositionDialog(position: string){
    this.position = position
    this.displayPosition = true
  }
}
