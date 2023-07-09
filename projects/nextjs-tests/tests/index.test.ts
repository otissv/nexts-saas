import { test, expect } from '@playwright/test'

import { config } from '../config'

const { google } = config()

test('should login with google oauth', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.getByRole('link', { name: 'Login' }).click()

  await expect(page.locator('h1')).toContainText('Login')

  await page.getByRole('button', { name: 'Google' }).click()

  await page.getByLabel('Email or phone').fill(google.username)

  await page.getByRole('button', { name: 'Next' }).click()

  console.log()
})
