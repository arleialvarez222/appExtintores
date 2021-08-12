import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => (this.isLogged = res) );
  }

}
