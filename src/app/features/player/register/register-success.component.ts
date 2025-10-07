import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'player-register-success',
  imports: [CommonModule],
  templateUrl: './register-success.component.html'
})
export class PlayerRegisterSuccessComponent implements OnInit {
  ngOnInit(): void {
    this.launchConfetti();
  }

  private launchConfetti() {
    const duration = 2500;
    const end = Date.now() + duration;
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const particles: { x: number; y: number; r: number; c: string; vx: number; vy: number; }[] = [];
    const colors = ['#ffffff', '#ffd166', '#06d6a0', '#ef476f'];
    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        r: 3 + Math.random() * 4,
        c: colors[Math.floor(Math.random() * colors.length)],
        vx: -1 + Math.random() * 2,
        vy: 2 + Math.random() * 3,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy *= 0.99;
        if (p.y > canvas.height) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
      });
    };
    const loop = () => {
      draw();
      if (Date.now() < end) requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('resize', resize);
    setTimeout(() => window.removeEventListener('resize', resize), duration + 500);
  }
}


