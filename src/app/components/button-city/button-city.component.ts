import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-city',
  templateUrl: './button-city.component.html',
  styleUrl: './button-city.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class ButtonCityComponent {
  @Input() text: string = '';
}
