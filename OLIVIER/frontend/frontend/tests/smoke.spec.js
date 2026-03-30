import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    // Note: Adjust the expected title based on your actual application title
    await expect(page).toHaveTitle(/Uprising Content OS/);
});

test('main page loads', async ({ page }) => {
    await page.goto('/');

    // Check if the root element exists
    const root = await page.locator('#root');
    await expect(root).toBeVisible();
});
