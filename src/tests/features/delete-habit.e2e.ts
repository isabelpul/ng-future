import { expect, test } from '@playwright/test'
import { HabitMother } from '../mothers/habit.mother'

test.describe('delete habit', () => {
  test('habit should be deleted', async ({ page }) => {
    await page.goto('/')

    const habit = HabitMother.habits()[0]
    await page.getByRole('link', { name: habit.name }).click()
    await expect(page.getByTestId('delete-habit-button')).toBeVisible()

    await page.getByTestId('delete-habit-button').click()
    const response = await page.waitForResponse('http://localhost:4000/api/habit-tasks')
    await response.json()
    expect(page.locator('body')).not.toContainText(habit.name)
  })
})
