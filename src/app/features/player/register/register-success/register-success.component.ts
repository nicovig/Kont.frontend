import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'player-register-success',
  imports: [CommonModule],
  templateUrl: './register-success.component.html'
})
export class PlayerRegisterSuccessComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  fading = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.launchConfetti();
    }
  }

  private launchConfetti() {
    if (!isPlatformBrowser(this.platformId)) return;
    const duration = 3000;
    const end = Date.now() + duration;
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const particles: { x: number; y: number; r: number; c: string; vx: number; vy: number; a: number; }[] = [];
    const colors = ['#ffffff', '#ffd166', '#06d6a0', '#ef476f'];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        r: 3 + Math.random() * 4,
        c: colors[Math.floor(Math.random() * colors.length)],
        vx: -1 + Math.random() * 2,
        vy: 2 + Math.random() * 3,
        a: 1
      });
    }
    const gravity = 0.06;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += gravity;
        p.vx *= 0.995;
        p.x += p.vx; p.y += p.vy;
        if (p.y > canvas.height + 20) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
      }
    };
    const loop = () => {
      draw();
      if (Date.now() < end || particles.length > 0) {
        requestAnimationFrame(loop);
      } else {
        // Fade out then navigate to dashboard
        this.fading = true;
        setTimeout(() => {
          const eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
          const poolId = this.route.snapshot.paramMap.get('poolId') ?? '';
          this.router.navigate(['/event', eventId, poolId, 'dashboard']);
        }, 300);
      }
    };
    loop();
    window.addEventListener('resize', resize);
    setTimeout(() => window.removeEventListener('resize', resize), duration + 500);
  }
}


