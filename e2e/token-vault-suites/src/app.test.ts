import { expect, test } from '@playwright/test';
import { asyncEvents } from './utils/async-events';

test('Test happy paths on test page', async ({ page }) => {
  const { clickButton, getTokens, navigate } = asyncEvents(page);
  await navigate('/');

  expect(page.url()).toBe('http://localhost:5823/');

  const userLoggedIn = await page.$('#loggedInDef');
  expect(await userLoggedIn.innerText()).toBe('false');

  await Promise.all([
    page.waitForURL('http://localhost:5823'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  await page.waitForSelector('#loggedInDef:has-text("true")');
  const loggedInDef = await page.$('#loggedInDef');
  expect(await loggedInDef.innerText()).toBe('true');

  // check if tokens are stored in the local storage
  const mainAppTokens = await getTokens('http://localhost:5823', 'CentralLoginOAuthClient');
  expect(mainAppTokens).toBeFalsy();

  const proxyAppTokens = await getTokens('http://localhost:5833', 'CentralLoginOAuthClient');
  expect(proxyAppTokens.accessToken).toBeTruthy();

  const hasTokensDef = await page.$('#hasTokensDef');
  expect(await hasTokensDef.innerText()).toBe('false');

  await page.getByRole('button', { name: 'Check for Tokens' }).click();
  await page.waitForTimeout(1000);

  expect(await hasTokensDef.innerText()).toBe('true');

  await clickButton('Refresh Tokens', '/access_token');

  const refreshedTokens = await getTokens('http://localhost:5833', 'CentralLoginOAuthClient');

  console.log(proxyAppTokens.accessToken);
  console.log(refreshedTokens.accessToken);

  expect(refreshedTokens).not.toBe(proxyAppTokens.accessToken);

  await clickButton('Fetch Real User', '/userinfo');

  const userInfoDef = await page.$('#userInfoDef');
  expect(await userInfoDef.innerText()).toBe('Bob Tester');

  await Promise.all([
    page.waitForResponse((response) => response.url().includes('/sessions')),
    page.waitForResponse((response) => response.url().includes('/endSession')),
    page.waitForResponse((response) => response.url().includes('/revoke')),
    page.getByRole('button', { name: 'Logout' }).click(),
  ]);

  const revokedTokens = await getTokens('http://localhost:5833', 'CentralLoginOAuthClient');
  expect(revokedTokens).toBeFalsy();
});
