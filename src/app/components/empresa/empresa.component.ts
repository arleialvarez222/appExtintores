import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [ HttpClient ]
})
export class EmpresaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
