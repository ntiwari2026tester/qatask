import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login UI End-to-End Tests using Page Object Model', () => {
  
  // 1. Page loads correctly: Navigate to / -> assert the email input, password input, and login button are all visible.
  test('1. Page loads correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Assert inputs and login button are visible using POM properties
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  // 2. Successful login: Fill in valid credentials -> click login -> assert URL changes to /dashboard.
  test('2. Successful login redirect', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Perform login action using POM helper
    await loginPage.login('admin@example.com', 'password123');

    // Assert redirect to /dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  // 3. Failed login — wrong password: Fill email + wrong password -> click login -> assert error message is visible on page.
  test('3. Failed login - wrong password error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Perform failed login using POM helpers
    await loginPage.login('admin@example.com', 'wrongpassword');

    // Assert error message using POM property
    await expect(loginPage.errorMessage).toBeVisible();
  });

  // 4. Empty form submission: Click login with empty inputs -> assert a validation error or that the URL does NOT change to /dashboard.
  test('4. Empty form submission validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Submit empty form using POM click action
    await loginPage.clickSubmit();

    // Assert validation error is visible OR we remain on the same page and URL has not changed
    const isValidationErrorVisible = await loginPage.validationError.first().isVisible().catch(() => false);
    
    if (isValidationErrorVisible) {
      expect(isValidationErrorVisible).toBe(true);
    } else {
      expect(loginPage.getCurrentUrl()).not.toContain('/dashboard');
    }
  });

  // 5. Loading state: Fill valid credentials -> click login -> assert the button is disabled OR a loading indicator is visible before redirect completes.
  test('5. Loading state on submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Fill credentials
    await loginPage.fillEmail('admin@example.com');
    await loginPage.fillPassword('password123');

    // Submit and immediately assert loading indicator visibility
    await loginPage.clickSubmit();
    await expect(loginPage.loadingIndicator.first()).toBeVisible();
  });
});
