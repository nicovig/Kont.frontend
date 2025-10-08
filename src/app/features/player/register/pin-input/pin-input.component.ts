import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'pin-input',
  imports: [CommonModule],
  template: `
  <div class="flex gap-3 justify-center">
    <ng-container *ngFor="let i of digits; let idx = index">
      <input maxlength="1" type="tel" inputmode="numeric" pattern="[0-9]"
             class="w-14 h-14 rounded-xl text-center text-2xl bg-white text-[color:var(--brand-color)]"
             (input)="onInput($event, idx)" (keydown)="onKeyDown($event, idx)" />
    </ng-container>
  </div>
  `
})
export class PinInputComponent {
  @Input() length = 5;
  @Output() valueChange = new EventEmitter<string>();

  get digits() {
    return Array.from({ length: this.length });
  }

  private collect(): string {
    const inputs = Array.from(document.querySelectorAll('pin-input input[maxlength="1"]')) as HTMLInputElement[];
    return inputs.map(i => i.value).join('');
  }

  onInput(e: Event, index: number) {
    const target = e.target as HTMLInputElement;
    if (target.value && !/^[0-9]$/.test(target.value)) {
      target.value = '';
      return;
    }
    const inputs = Array.from((target.parentElement?.parentElement as HTMLElement).querySelectorAll('input[maxlength="1"]')) as HTMLInputElement[];
    if (target.value && inputs[index + 1]) inputs[index + 1].focus();
    this.valueChange.emit(inputs.map(i => i.value).join(''));
  }

  onKeyDown(e: KeyboardEvent, index: number) {
    const target = e.target as HTMLInputElement;
    const inputs = Array.from((target.parentElement?.parentElement as HTMLElement).querySelectorAll('input[maxlength="1"]')) as HTMLInputElement[];
    if (e.key === 'Backspace' && target.value === '' && index > 0) {
      inputs[index - 1].focus();
      inputs[index - 1].select();
    }
  }
}


