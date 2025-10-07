import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Component({
  standalone: true,
  selector: 'player-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class PlayerRegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(PlayerService);
  readonly eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
  readonly poolId = this.route.snapshot.paramMap.get('poolId') ?? '';

  step = 1;

  form = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]]
  });

  pinForm = this.fb.group({
    pin: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
  });

  next() {
    if (this.form.invalid) return;
    this.step = 2;
    setTimeout(() => {
      const inputs = Array.from(document.querySelectorAll('input[maxlength="1"]')) as HTMLInputElement[];
      inputs[0]?.focus();
    });
  }

  move(e: Event, index: number) {
    const target = e.target as HTMLInputElement;
    const inputs = Array.from(document.querySelectorAll('input[maxlength="1"]')) as HTMLInputElement[];
    
    // Only allow numeric input
    if (target.value && !/^[0-9]$/.test(target.value)) {
      target.value = '';
      return;
    }
    
    if (target.value && inputs[index + 1]) inputs[index + 1].focus();
    const pin = inputs.map(i => i.value).join('');
    this.pinForm.patchValue({ pin });
    
    // Auto-submit when all 4 digits are entered
    if (pin.length === 4) {
      setTimeout(() => this.submit(), 100);
    }
  }

  submit() {
    if (this.pinForm.invalid || this.form.invalid) return;
    
    const payload = {
      firstname: this.form.value.firstname!,
      lastname: this.form.value.lastname!,
      email: this.form.value.email!,
      username: this.form.value.username!,
      pin: this.pinForm.value.pin!
    };
    
    this.service.register(this.eventId, this.poolId, payload).subscribe({
      next: () => {
        this.router.navigate(['/event', this.eventId, this.poolId, 'dashboard']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Optionally show error message to user
      }
    });
  }
}


