import { test, expect } from '@playwright/test';
import { setAll, getAll, add, update } from '../../tests/010/10.utils';

test.beforeEach(async ({ request }) => {
  await setAll(request, { items: [] });
});

test('add should add an item', async ({ request }) => {
  const addResult = await add(request, { message: 'test' });
  expect(addResult.json).toHaveProperty('id');
  expect(typeof addResult.json.id).toBe('string');

  const getResult = await getAll(request);
  expect(getResult.json).toEqual({
    items: [
      {
        id: addResult.json.id,
        completed: false,
        message: 'test',
      },
    ],
  });
});

test('setAll should be able to overwrite the items', async ({ request }) => {
  const message = 'test';
  await add(request, { message });

  const items = await getAll(request);
  const updatedItems = items.json.items.map((item) => ({ ...item, completed: true }));
  const setAllResponse = await setAll(request, { items: updatedItems });
  expect(setAllResponse.json).toEqual({ status: 'success' });

  const getUpdated = await getAll(request);
  expect(getUpdated.json).toEqual({ items: updatedItems });
});

