import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as GodActions from '../../store/god.action';

@Component({
  selector: 'app-god-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class GodLoginComponent {
  email = '';
  password = '';

  constructor(private readonly store: Store) {}

  onSubmit() {
    this.store.dispatch(GodActions.loginGod({ email: this.email, password: this.password }));
  }
}



