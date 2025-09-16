import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-god-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="hero">
      <div class="hero-inner">
        <h1>God Dashboard</h1>
        <nav class="menu">
          <a routerLink="/god/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="item">Dashboard</a>
          <a routerLink="/god/sites" routerLinkActive="active" class="item">Sites</a>
        </nav>
      </div>
    </header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `.hero{background:linear-gradient(90deg,#7c3aed,#06b6d4);padding:24px 0;color:#fff}`,
    `.hero-inner{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}`,
    `.menu{display:flex;gap:12px}`,
    `.item{padding:10px 14px;border-radius:10px;background:rgba(255,255,255,.15);color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.25)}`,
    `.item:hover{background:rgba(255,255,255,.25)}`,
    `.active{box-shadow:0 0 0 2px rgba(255,255,255,.6) inset}`,
    `.content{background:#ffffff;min-height:calc(100vh - 72px)}`
  ]
})
export class GodShellComponent {}


