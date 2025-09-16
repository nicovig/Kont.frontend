import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-god-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './god-shell.component.html',
  styleUrls: ['./god-shell.component.css']
})
export class GodShellComponent {}


