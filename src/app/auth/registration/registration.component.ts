import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePath } from 'src/app/app-routing.module';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  dataUsageConsent = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registration() {
    this.authService.registerUser(this.user);
    this.router.navigateByUrl(TranslatePath);
  }

}
