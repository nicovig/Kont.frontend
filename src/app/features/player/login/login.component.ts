import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { PinInputComponent } from '../register/pin-input/pin-input.component';

@Component({
  standalone: true,
  selector: 'player-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PinInputComponent],
  templateUrl: './login.component.html'
})
export class PlayerLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(PlayerService);

  errorMessage: string | null = null;
  pin = '';

  form = this.fb.group({
    identifier: ['', [Validators.required]]
  });

  onPin(v: string) {
    this.pin = v;
  }

  submit() {
    if (this.form.invalid || this.pin.length !== 5) return;
    this.errorMessage = null;
    this.service.login(this.form.value.identifier!, this.pin).subscribe({
      next: () => this.router.navigate(['../dashboard'], { relativeTo: this.route }),
      error: (err) => {
        const code = err.error?.code;
        if (code === 'not_found') this.errorMessage = "Compte introuvable";
        else if (code === 'bad_pin') this.errorMessage = "Code PIN invalide";
        else this.errorMessage = "Une erreur est survenue";
      }
    });
  }

  goToRegister() {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }
}


