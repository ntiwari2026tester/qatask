import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly url = 'http://localhost:5173/';

  // Input fields
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  // Buttons and actions
  readonly loginButton: Locator;

  // Indicators and messages
  readonly errorMessage: Locator;
  readonly validationError: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;

    // Set locators based on specification
    this.emailInput = page.locator('input[name="email"], input[placeholder="Email"]');
    this.passwordInput = page.locator('input[name="password"], input[placeholder="Password"]');
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');

    // Error message: "Invalid credentials" or "incorrect"
    this.errorMessage = page.locator('text=/Invalid credentials|incorrect/i');

    // Validation error when fields are empty / invalid
    this.validationError = page.locator('input:invalid, .validation-error, text=/required|empty/i');

    // Loading indicator / disabled button
    this.loadingIndicator = page.locator('button[disabled], .spinner, text=/loading/i');
  }

  /**
   * Navigates to the login page.
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Fills in the email address.
   */
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Fills in the password.
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login/submit button.
   */
  async clickSubmit() {
    await this.loginButton.click();
  }

  /**
   * Performs the entire login operation.
   */
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  /**
   * Checks whether the browser is redirected to the dashboard.
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}
