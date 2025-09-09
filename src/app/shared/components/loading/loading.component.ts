import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center p-8" [class]="containerClass">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" [class]="spinnerClass"></div>
        @if (message) {
          <p class="mt-2 text-sm text-gray-600" [class]="messageClass">{{ message }}</p>
        }
      </div>
    </div>
  `
})
export class LoadingComponent {
  @Input() message = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() containerClass = '';
  @Input() messageClass = '';

  get spinnerClass(): string {
    switch (this.size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  }
}

