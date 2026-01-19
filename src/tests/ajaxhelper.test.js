import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getData, postData, putData, deleteData } from '../lib/helpers/ajaxhelper.js';

// Mock fetch globally
global.fetch = vi.fn();

// Mock console methods to avoid clutter in test output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('ajaxhelper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console logs during tests
    console.log = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe('getData', () => {
    it('should fetch data successfully', async () => {
      const mockData = { data: 'test' };
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await getData('http://test.com/api');
      
      // getData doesn't pass any options to fetch, just the URL
      expect(global.fetch).toHaveBeenCalledWith('http://test.com/api');
      expect(result).toEqual(mockData);
    });

    it('should handle failed request', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Not found' }),
      });

      const result = await getData('http://test.com/api');
      
      // The function returns the error response, doesn't throw
      expect(result).toHaveProperty('error');
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      global.fetch.mockRejectedValueOnce(networkError);

      const result = await getData('http://test.com/api');
      
      // When fetch throws, the catch block returns the error object
      expect(result).toBe(networkError);
    });
  });

  describe('postData', () => {
    it('should post data successfully', async () => {
      const mockResponse = { id: 1, name: 'test' };
      const postPayload = { name: 'test' };
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const result = await postData('http://test.com/api', postPayload);
      
      expect(global.fetch).toHaveBeenCalledWith('http://test.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle post errors', async () => {
      const postPayload = { name: 'test' };
      
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Invalid data' }),
      });

      const result = await postData('http://test.com/api', postPayload);
      
      expect(result).toHaveProperty('error');
    });

    it('should handle network errors', async () => {
      const postPayload = { name: 'test' };
      const networkError = new Error('Network error');
      
      global.fetch.mockRejectedValueOnce(networkError);

      const result = await postData('http://test.com/api', postPayload);
      
      expect(result).toEqual({ error: networkError });
    });
  });

  describe('putData', () => {
    it('should update data successfully', async () => {
      const mockResponse = { id: 1, name: 'updated' };
      const updatePayload = { name: 'updated' };
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const result = await putData('http://test.com/api/1', updatePayload);
      
      expect(global.fetch).toHaveBeenCalledWith('http://test.com/api/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle update errors', async () => {
      const updatePayload = { name: 'updated' };
      
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Not found' }),
      });

      const result = await putData('http://test.com/api/1', updatePayload);
      
      expect(result).toHaveProperty('error');
    });

    it('should handle network errors', async () => {
      const updatePayload = { name: 'updated' };
      const networkError = new Error('Network error');
      
      global.fetch.mockRejectedValueOnce(networkError);

      const result = await putData('http://test.com/api/1', updatePayload);
      
      expect(result).toEqual({ error: networkError });
    });
  });

  describe('deleteData', () => {
    it('should delete data successfully', async () => {
      const mockResponse = { message: 'deleted' };
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const result = await deleteData('http://test.com/api/1');
      
      // deleteData only passes method, no headers
      expect(global.fetch).toHaveBeenCalledWith('http://test.com/api/1', {
        method: 'DELETE'
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle delete errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Not found' }),
      });

      const result = await deleteData('http://test.com/api/1');
      
      expect(result).toHaveProperty('error');
    });

    it('should handle network errors on delete', async () => {
      const networkError = new Error('Network error');
      global.fetch.mockRejectedValueOnce(networkError);

      const result = await deleteData('http://test.com/api/1');
      
      // The catch block returns { error: networkError }
      expect(result).toEqual({ error: networkError });
    });
  });
});