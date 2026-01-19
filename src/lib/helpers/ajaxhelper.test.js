// src/lib/helpers/ajaxhelper.test.js
import { describe, it, expect, vi } from 'vitest';
import { getData } from './ajaxhelper';

describe('ajaxhelper', () => {
  it('fetches data successfully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'test' })
      })
    );

    const result = await getData('/test');
    expect(result).toEqual({ data: 'test' });
  });
});