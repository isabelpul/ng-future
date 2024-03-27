import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core'
import { HabitComponent } from '../../../delivery/habit/habit.component'
import { RouterLink } from '@angular/router'
import { UseCaseService } from '../../../../../core/use-case/use-case.service'
import { HabitTask } from '../domain/habit-task'
import { GetHabitTasksQry } from '../application/get-habit-tasks.qry'
import { DateTime } from '../../../../../core/datetime/datetime'
import { HabitTasksDatePipe } from './habit-tasks-date.pipe'

@Component({
  selector: 'app-habit-tasks',
  standalone: true,
  imports: [HabitComponent, RouterLink, HabitTasksDatePipe],
  templateUrl: './habit-tasks.page.html',
  styleUrl: './habit-tasks.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitTasksPage {
  habitTasks = signal<HabitTask[]>([])
  headers = computed(() => this.habitTasks()?.[0].tasks.map(x => x.habit) ?? [])
  sortedHabitTasks = computed(() => this.habitTasks().sort((a, b) => DateTime.compareDates(a.date, b.date)))
  constructor(private readonly useCaseService: UseCaseService) {
    effect(async () => {
      const value = await this.useCaseService.execute(GetHabitTasksQry)
      this.habitTasks.set(value)
    })
  }
}