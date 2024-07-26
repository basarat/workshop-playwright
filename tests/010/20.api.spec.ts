import { test, expect } from '@playwright/test';
import { setAll, getAll } from './10.utils';

test('should be able to clear all the items', async ({ request }) => {
  const setResult = await setAll(request, { items: [] });
  expect(setResult.response.ok()).toBeTruthy();
  expect(setResult.response.status()).toBe(200);
  expect(setResult.json).toEqual({ status: 'success' });

  const getResponse = await getAll(request);
  expect(getResponse.response.ok()).toBeTruthy();
  expect(getResponse.response.status()).toBe(200);
  expect(getResponse.json).toEqual({ items: [] });
});
