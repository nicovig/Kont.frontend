import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../store/admin.actions';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {
  email = '';
  password = '';

  constructor(private readonly store: Store) {}

  onSubmit() {
    this.store.dispatch(AdminActions.loginAdmin({ email: this.email, password: this.password }));
  }
}



