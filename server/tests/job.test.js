const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');

describe('Job API Endpoints', () => {
  let token;
  let testJobId;

  beforeAll(async () => {
    // Connect to a test database
    await mongoose.disconnect();
    await mongoose.connect('mongodb://127.0.0.1:27017/service-board-test');
    
    // Create a test user for auth
    await User.deleteMany();
    const user = {
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'password123'
    };
    
    const res = await request(app).post('/api/auth/register').send(user);
    token = res.body.token;
  });

  beforeEach(async () => {
    await Job.deleteMany();
    const job = await Job.create({
      title: 'Initial Job',
      description: 'Initial description',
      category: 'Plumbing',
      location: 'Test location',
      contactName: 'Test Name',
      contactEmail: 'test@test.com'
    });
    testJobId = job._id;
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /api/jobs', () => {
    it('should return a list of jobs', async () => {
      const res = await request(app).get('/api/jobs');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job if authenticated', async () => {
      const newJob = {
        title: 'New Protected Job',
        description: 'New Test description',
        category: 'Electrical',
        location: 'New Test location',
        contactName: 'New Test Name',
        contactEmail: 'newtest@test.com'
      };

      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(newJob);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe(newJob.title);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).post('/api/jobs').send({});
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('PATCH /api/jobs/:id', () => {
    it('should update job status if authenticated', async () => {
      const res = await request(app)
        .patch(`/api/jobs/${testJobId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'In Progress' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('In Progress');
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).patch(`/api/jobs/${testJobId}`).send({ status: 'Closed' });
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('DELETE /api/jobs/:id', () => {
    it('should delete job if authenticated', async () => {
      const res = await request(app)
        .delete(`/api/jobs/${testJobId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).delete(`/api/jobs/${testJobId}`);
      expect(res.statusCode).toEqual(401);
    });
  });
});
