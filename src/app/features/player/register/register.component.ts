import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, of, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'player-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class PlayerRegisterComponent implements OnInit {
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
    pin: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]]
  });

  emailChecking = false;
  usernameChecking = false;

  ngOnInit(): void {
    const emailCtrl = this.form.get('email');
    const usernameCtrl = this.form.get('username');

    emailCtrl?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.emailChecking = !!emailCtrl.value && emailCtrl.valid; }),
      filter(() => !!emailCtrl?.value && emailCtrl?.valid),
      switchMap(value => this.service.checkEmail(value as string).pipe(
        catchError(() => of({ available: true }))
      ))
    ).subscribe(r => {
      this.emailChecking = false;
      if (!r.available) {
        emailCtrl?.setErrors({ ...(emailCtrl.errors || {}), emailTaken: true });
      } else {
        if (emailCtrl?.hasError('emailTaken')) {
          const { emailTaken, ...rest } = emailCtrl.errors as any;
          emailCtrl.setErrors(Object.keys(rest).length ? rest : null);
        }
      }
    });

    usernameCtrl?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.usernameChecking = !!usernameCtrl.value && usernameCtrl.valid; }),
      filter(() => !!usernameCtrl?.value && usernameCtrl?.valid),
      switchMap(value => this.service.checkUsername(value as string).pipe(
        catchError(() => of({ available: true }))
      ))
    ).subscribe(r => {
      this.usernameChecking = false;
      if (!r.available) {
        usernameCtrl?.setErrors({ ...(usernameCtrl.errors || {}), usernameTaken: true });
      } else {
        if (usernameCtrl?.hasError('usernameTaken')) {
          const { usernameTaken, ...rest } = usernameCtrl.errors as any;
          usernameCtrl.setErrors(Object.keys(rest).length ? rest : null);
        }
      }
    });
  }

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
    
    // Move to next input if current has value
    if (target.value && inputs[index + 1]) {
      inputs[index + 1].focus();
    }
    
    // Update PIN value
    const pin = inputs.map(i => i.value).join('');
    this.pinForm.patchValue({ pin });
    
    // Trigger validation
    this.pinForm.get('pin')?.updateValueAndValidity();
    
    // Auto-submit when all 5 digits are entered
    if (pin.length === 5) {
      setTimeout(() => this.submit(), 100);
    }
  }

  onKeyDown(e: KeyboardEvent, index: number) {
    const target = e.target as HTMLInputElement;
    const inputs = Array.from(document.querySelectorAll('input[maxlength="1"]')) as HTMLInputElement[];
    
    // Handle backspace
    if (e.key === 'Backspace' && target.value === '' && index > 0) {
      inputs[index - 1].focus();
      inputs[index - 1].select();
    }
  }

  submit() {
    console.log('Submit called');
    console.log('PIN form valid:', this.pinForm.valid);
    console.log('PIN form value:', this.pinForm.value);
    console.log('Main form valid:', this.form.valid);
    
    if (this.pinForm.invalid || this.form.invalid) {
      console.log('Form is invalid, not submitting');
      return;
    }
    
    const payload = {
      firstname: this.form.value.firstname!,
      lastname: this.form.value.lastname!,
      email: this.form.value.email!,
      username: this.form.value.username!,
      pin: this.pinForm.value.pin!
    };
    
    console.log('Submitting payload:', payload);
    
    this.service.register(this.eventId, this.poolId, payload).subscribe({
      next: () => {
        console.log('Registration successful, navigating to dashboard');
        this.router.navigate(['/event', this.eventId, this.poolId, 'dashboard']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Optionally show error message to user
      }
    });
  }
}


