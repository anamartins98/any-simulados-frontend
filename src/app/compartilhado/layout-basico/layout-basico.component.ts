import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-layout-basico',
  imports: [MatDividerModule],
  templateUrl: './layout-basico.component.html',
  styleUrl: './layout-basico.component.scss'
})
export class LayoutBasicoComponent {
  @Input() titulo: string = '';
}
