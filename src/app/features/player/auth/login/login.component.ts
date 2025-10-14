import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PinInputComponent } from '../../register/pin-input/pin-input.component';
import * as PlayerAuthActions from '../store/player-auth.actions';
import * as PlayerAuthSelectors from '../store/player-auth.selectors';

@Component({
  standalone: true,
  selector: 'player-auth-login',
  imports: [CommonModule, ReactiveFormsModule, PinInputComponent],
  template: `
  <section class="min-h-screen bg-[var(--brand-color)] flex flex-col max-w-md mx-auto p-6">
    <h1 class="text-center text-white font-extrabold text-3xl mb-8">Connexion Joueur</h1>
    
    <div class="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/20">
      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">
        <div class="space-y-2">
          <label class="text-white/90 text-sm">Email ou Nom d'utilisateur</label>
          <input class="w-full rounded-xl p-3 bg-white text-[color:var(--brand-color)] placeholder:text-gray-400" 
                 placeholder="pierre.gasly ou pierre@ex.com" formControlName="identifier" />
        </div>

        <div class="space-y-2">
          <label class="text-white/90 text-sm">Code PIN (5 chiffres)</label>
          <pin-input (valueChange)="onPin($event)"></pin-input>
        </div>

        <div *ngIf="error$ | async as error" class="bg-white/20 text-white border border-white/40 rounded-lg px-3 py-2">
          {{ error }}
        </div>

        <div class="pt-2 flex justify-end">
          <button class="bg-white text-[color:var(--brand-color)] rounded-lg px-6 py-3 font-extrabold disabled:opacity-60" 
                  type="submit" [disabled]="form.invalid || pin.length !== 5 || (loading$ | async)">
            <span *ngIf="loading$ | async">Connexion...</span>
            <span *ngIf="!(loading$ | async)">Se connecter</span>
          </button>
        </div>
      </form>
    </div>
  </section>
  `
})
export class PlayerAuthLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  pin = '';
  error$ = this.store.select(PlayerAuthSelectors.selectPlayerError);
  loading$ = this.store.select(PlayerAuthSelectors.selectPlayerLoading);

  form = this.fb.group({
    identifier: ['', [Validators.required]]
  });

  onPin(v: string) {
    this.pin = v;
  }

  submit() {
    if (this.form.invalid || this.pin.length !== 5) return;
    
    this.store.dispatch(PlayerAuthActions.loginPlayer({ 
      identifier: this.form.value.identifier!, 
      pin: this.pin 
    }));

    // Listen for success and navigate
    this.store.select(PlayerAuthSelectors.selectIsPlayerAuthenticated).subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['/player/dashboard']);
      }
    });
  }
}
