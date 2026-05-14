const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, createJob); // Protected

router.route('/:id')
  .get(getJob)
  .patch(protect, updateJob) // Protected
  .delete(protect, deleteJob); // Protected

module.exports = router;
