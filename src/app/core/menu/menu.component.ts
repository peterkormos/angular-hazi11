import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  logoSrc = `${environment.logoSrc}`;

  constructor(readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  get user() {
    return this.authService.user?.name;
  }
}
