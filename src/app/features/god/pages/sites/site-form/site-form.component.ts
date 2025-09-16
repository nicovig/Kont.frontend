import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Site } from '../../../../../models';

@Component({
  selector: 'app-god-site-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class GodSiteFormComponent implements OnChanges {
  @Input() value: Site | null = null;
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() save = new EventEmitter<Site>();

  form: Partial<Site> = { name: '', address: '', city: '', zipCode: '', country: '', state: '', phoneNumber: '', email: '' };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.form = this.value ? { ...this.value } : { name: '', address: '', city: '', zipCode: '', country: '', state: '', phoneNumber: '', email: '' };
    }
  }

  submit() {
    this.save.emit(this.form as Site);
  }
}


