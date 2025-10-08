import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { PinInputComponent } from './pin-input/pin-input.component';

@Component({
  standalone: true,
  selector: 'player-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PinInputComponent],
  template: `
  <section class="min-h-screen bg-[var(--brand-color)] flex flex-col max-w-md mx-auto p-6">
    <h1 class="text-center text-white font-extrabold text-3xl mb-2">Inscription</h1>
    <div class="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/20">
      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">
        <div class="space-y-2">
          <label class="text-white/90 text-sm">Email ou Nom d'utilisateur</label>
          <input class="w-full rounded-xl p-3 bg-white text-[color:var(--brand-color)] placeholder:text-gray-400" placeholder="pierre.gasly ou pierre@ex.com" formControlName="identifier" />
        </div>

        <div class="space-y-2">
          <label class="text-white/90 text-sm">Code PIN (5 chiffres)</label>
          <pin-input (valueChange)="onPin($event)"></pin-input>
        </div>

        <div *ngIf="errorMessage" class="bg-white/20 text-white border border-white/40 rounded-lg px-3 py-2">
          {{ errorMessage }}
        </div>

        <div class="pt-2 flex justify-end">
          <button class="bg-white text-[color:var(--brand-color)] rounded-lg px-6 py-3 font-extrabold disabled:opacity-60" type="submit" [disabled]="form.invalid || pin.length !== 5">Se connecter</button>
        </div>
      </form>
    </div>
    <div class="text-center mt-6">
      <button class="text-white underline" (click)="goToRegister()">Je n'ai pas de compte</button>
    </div>
  </section>
  `
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


