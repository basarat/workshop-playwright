import { test, expect } from '@playwright/test';

test('expect.any', async ({}) => {
  const id = Math.random().toString();
  expect(id).toEqual(expect.any(String));

  const obj = { id };
  expect(obj).toEqual({ id: expect.any(String) });
});
