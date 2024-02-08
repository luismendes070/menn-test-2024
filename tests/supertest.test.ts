// supertest.test.ts
import request from 'supertest';
import app from '../server'; // Your Next.js app

describe('GET /api/users', () => {
  // Test cases for querying an array of users
  it('should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Further assertions on user data
  });

  it('should filter users by query parameters', async () => {
    const response = await request(app).get('/api/users?name=John');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Assertions on filtered users
  });

  // Add more test cases for other GET, POST, PUT, DELETE methods as needed
});
