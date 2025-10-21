import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
