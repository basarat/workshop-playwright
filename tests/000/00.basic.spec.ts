import { test, expect } from '@playwright/test';

test('Math works', async () => {
  // arrange
  const a = 1;
  const b = 2;
  // act 
  const sum = a + b;
  // assert
  expect(sum).toBe(3);
});