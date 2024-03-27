import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Id } from '../../../../../../core/models/id'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-habit-updater',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './habit-updater.component.html',
  styleUrl: './habit-updater.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitUpdaterComponent {
  habitId = input.required<Id>()
}