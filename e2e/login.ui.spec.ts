import { test, expect } from '@playwright/test';

test.describe('Login UI End-to-End Tests', () => {
  const FRONTEND_URL = 'http://localhost:5173/';

  // 1. Page loads correctly: Navigate to / -> assert the email input, password input, and login button are all visible.
  test('1. Page loads correctly', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Assert inputs and login button are visible
    const emailInput = page.locator('input[name="email"], input[placeholder="Email"]');
    const passwordInput = page.locator('input[name="password"], input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  // 2. Successful login: Fill in valid credentials -> click login -> assert URL changes to /dashboard.
  test('2. Successful login redirect', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const emailInput = page.locator('input[name="email"], input[placeholder="Email"]');
    const passwordInput = page.locator('input[name="password"], input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');

    // Fill credentials and submit
    await emailInput.fill('admin@example.com');
    await passwordInput.fill('password123');
    await loginButton.click();

    // Assert redirect to /dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  // 3. Failed login — wrong password: Fill email + wrong password -> click login -> assert error message is visible on page.
  test('3. Failed login - wrong password error message', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const emailInput = page.locator('input[name="email"], input[placeholder="Email"]');
    const passwordInput = page.locator('input[name="password"], input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');

    // Fill incorrect credentials and submit
    await emailInput.fill('admin@example.com');
    await passwordInput.fill('wrongpassword');
    await loginButton.click();

    // Assert error message is visible on the page
    const errorMessage = page.locator('text=/Invalid credentials|incorrect/i');
    await expect(errorMessage).toBeVisible();
  });

  // 4. Empty form submission: Click login with empty inputs -> assert a validation error or that the URL does NOT change to /dashboard.
  test('4. Empty form submission validation', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');

    // Click submit with empty form fields
    await loginButton.click();

    // Assert validation error is visible OR we remain on the same page and URL has not changed to /dashboard
    const validationError = page.locator('input:invalid, .validation-error, text=/required|empty/i');
    const isValidationErrorVisible = await validationError.first().isVisible().catch(() => false);
    
    if (isValidationErrorVisible) {
      expect(isValidationErrorVisible).toBe(true);
    } else {
      expect(page.url()).not.toContain('/dashboard');
    }
  });

  // 5. Loading state: Fill valid credentials -> click login -> assert the button is disabled OR a loading indicator is visible before redirect completes.
  test('5. Loading state on submission', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const emailInput = page.locator('input[name="email"], input[placeholder="Email"]');
    const passwordInput = page.locator('input[name="password"], input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');

    // Fill credentials
    await emailInput.fill('admin@example.com');
    await passwordInput.fill('password123');

    // Trigger form submit and immediately check loading indicator / disabled state
    await loginButton.click();

    // The button should be disabled OR a loading spinner should be visible in-flight
    const loadingState = page.locator('button[disabled], .spinner, text=/loading/i');
    await expect(loadingState.first()).toBeVisible();
  });
});
