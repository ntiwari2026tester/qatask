import { test, expect } from '@playwright/test';

test.describe('RICR Dashboard Auth API Endpoints', () => {

  // 1. Register -> success: POST to /auth/register with valid data -> assert status 200, body.success === true, body.data.email equals the registered email.
  test('1. Register -> success', async ({ request }) => {
    const uniqueEmail = `qa-user-${Date.now()}@example.com`;
    const response = await request.post('auth/register', {
      data: {
        userName: 'qatester',
        email: uniqueEmail,
        password: 'securePassword123',
        userType: 1
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toBeDefined();
    expect(body.data.email).toBe(uniqueEmail);
    expect(body.data.id).toBeDefined();
  });

  // 2. Register -> validation fail: POST with missing email field -> assert status 400, body.success === false.
  test('2. Register -> validation fail (missing email)', async ({ request }) => {
    const response = await request.post('auth/register', {
      data: {
        userName: 'qatester',
        password: 'securePassword123',
        userType: 1
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBeDefined();
  });

  // 3. Login -> web client: POST to /auth/login -> assert status 200, response sets a Set-Cookie header containing accessToken.
  test('3. Login -> web client (cookie token)', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        email: 'tester@example.com',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);

    const headers = response.headers();
    const setCookie = headers['set-cookie'];
    expect(setCookie).toBeDefined();
    expect(setCookie).toContain('accessToken');
  });

  // 4. Login -> mobile client: POST with User-Agent: Mozilla/5.0 (Android 13; Mobile) -> assert status 200, body.data.accessToken is a non-empty string.
  test('4. Login -> mobile client (bearer header token)', async ({ request }) => {
    const response = await request.post('auth/login', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 13; Mobile)'
      },
      data: {
        email: 'tester@example.com',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.accessToken).toBeDefined();
    expect(typeof body.data.accessToken).toBe('string');
    expect(body.data.accessToken.length).toBeGreaterThan(0);
  });

  // 5. Login -> invalid credentials: POST with wrong password -> assert status 401, body.success === false.
  test('5. Login -> invalid credentials', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        email: 'tester@example.com',
        password: 'wrongPassword123'
      }
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid credentials');
  });

  // 6. GET /me -> unauthorized: No token -> assert status 401.
  test('6. GET /me -> unauthorized', async ({ request }) => {
    const response = await request.get('auth/me');

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Not authorized');
  });

  // 7. GET /me -> authorized: Login first, extract token from cookie, then call /auth/me with that cookie -> assert status 200, body.data.id is a number.
  test('7. GET /me -> authorized', async ({ request }) => {
    // Perform login first to extract the HttpOnly cookie
    const loginResponse = await request.post('auth/login', {
      data: {
        email: 'tester@example.com',
        password: 'password123'
      }
    });

    expect(loginResponse.status()).toBe(200);
    const setCookie = loginResponse.headers()['set-cookie'];
    expect(setCookie).toBeDefined();

    // Call /auth/me passing the extracted cookie in the headers
    const response = await request.get('auth/me', {
      headers: {
        'Cookie': setCookie!
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBeDefined();
    expect(typeof body.data.id).toBe('number');
    expect(body.data.email).toBe('tester@example.com');
  });

  // 8. Logout: Call /auth/logout with valid cookie -> assert status 200, assert the response clears the cookie.
  test('8. Logout -> cookie cleared', async ({ request }) => {
    // Login to get a valid cookie
    const loginResponse = await request.post('auth/login', {
      data: {
        email: 'tester@example.com',
        password: 'password123'
      }
    });
    const setCookie = loginResponse.headers()['set-cookie'];
    expect(setCookie).toBeDefined();

    // Perform logout
    const logoutResponse = await request.post('auth/logout', {
      headers: {
        'Cookie': setCookie!
      }
    });

    expect(logoutResponse.status()).toBe(200);
    const body = await logoutResponse.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe('Logged out successfully');

    // Confirm that the Set-Cookie header is returned and clears accessToken
    const logoutSetCookie = logoutResponse.headers()['set-cookie'];
    expect(logoutSetCookie).toBeDefined();
    // A cookie-clearing header typically sets the Max-Age=0, Expires in 1970, or empty value
    expect(logoutSetCookie).toMatch(/(max-age=0|expires=|cleared|deleted|accesstoken=;)/i);
  });
});
