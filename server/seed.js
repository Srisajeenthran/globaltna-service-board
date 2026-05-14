const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config();

const sampleJobs = [
  {
    title: 'Leaky Faucet Repair',
    description: 'The kitchen sink faucet is constantly dripping and needs to be fixed or replaced.',
    category: 'Plumbing',
    location: '123 Main St, Springfield',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    status: 'Open'
  },
  {
    title: 'Install Ceiling Fan',
    description: 'Need a licensed electrician to install a new ceiling fan in the living room. Wiring is already there.',
    category: 'Electrical',
    location: '456 Oak Ave, Springfield',
    contactName: 'Jane Smith',
    contactEmail: 'jane@example.com',
    status: 'In Progress'
  },
  {
    title: 'Custom Bookshelves',
    description: 'Looking for a carpenter to build custom built-in bookshelves for my home office.',
    category: 'Carpentry',
    location: '789 Pine Ln, Springfield',
    contactName: 'Bob Johnson',
    contactEmail: 'bob@example.com',
    status: 'Open'
  },
  {
    title: 'Deep House Cleaning',
    description: 'Moving out next week and need a deep clean of a 3-bedroom, 2-bathroom house.',
    category: 'Cleaning',
    location: '101 Elm St, Springfield',
    contactName: 'Alice Brown',
    contactEmail: 'alice@example.com',
    status: 'Closed'
  },
  {
    title: 'Lawn Mowing and Trimming',
    description: 'Need someone to mow the front and back lawn and trim the hedges.',
    category: 'Landscaping',
    location: '202 Maple Dr, Springfield',
    contactName: 'Charlie Davis',
    contactEmail: 'charlie@example.com',
    status: 'Open'
  },
  {
    title: 'Kitchen Backsplash Tile',
    description: 'Looking for someone to install subway tile backsplash in our kitchen. About 25 sq ft.',
    category: 'Other',
    location: '303 Birch Rd, Springfield',
    contactName: 'Diana Prince',
    contactEmail: 'diana@example.com',
    status: 'Open'
  },
  {
    title: 'Gutter Cleaning',
    description: 'Two-story house needs gutters cleaned and downspouts checked for blockages.',
    category: 'Landscaping',
    location: '404 Cedar St, Springfield',
    contactName: 'Edward Norton',
    contactEmail: 'edward@example.com',
    status: 'Open'
  },
  {
    title: 'Fix Flickering Lights',
    description: 'Several lights in the hallway are flickering. Likely a loose connection or old ballast.',
    category: 'Electrical',
    location: '505 Walnut Ave, Springfield',
    contactName: 'Fiona Apple',
    contactEmail: 'fiona@example.com',
    status: 'In Progress'
  },
  {
    title: 'Assemble IKEA Wardrobe',
    description: 'Need help assembling two large PAX wardrobes from IKEA. All parts and tools provided.',
    category: 'Carpentry',
    location: '606 Ash Ln, Springfield',
    contactName: 'George Clooney',
    contactEmail: 'george@example.com',
    status: 'Open'
  },
  {
    title: 'Burst Pipe Emergency',
    description: 'URGENT: Water leaking from the ceiling in the basement. Need a plumber ASAP.',
    category: 'Plumbing',
    location: '707 Willow Way, Springfield',
    contactName: 'Hannah Montana',
    contactEmail: 'hannah@example.com',
    status: 'Open'
  },
  {
    title: 'Window Washing',
    description: 'Full house window washing inside and out. About 15 windows in total.',
    category: 'Cleaning',
    location: '808 Cherry Dr, Springfield',
    contactName: 'Ian McKellen',
    contactEmail: 'ian@example.com',
    status: 'Closed'
  },
  {
    title: 'Tree Stump Removal',
    description: 'Have a medium-sized oak stump in the backyard that needs to be ground down.',
    category: 'Landscaping',
    location: '909 Poplar Ct, Springfield',
    contactName: 'Julia Roberts',
    contactEmail: 'julia@example.com',
    status: 'Open'
  },
  {
    title: 'Wall Mounting TV',
    description: 'Need a 65-inch TV mounted on a drywall. I have the wall mount bracket.',
    category: 'Other',
    location: '111 Sycamore St, Springfield',
    contactName: 'Kevin Hart',
    contactEmail: 'kevin@example.com',
    status: 'Open'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/service-board');
    console.log('MongoDB Connected...');

    // Delete existing data
    await Job.deleteMany();
    await User.deleteMany();
    console.log('Existing data cleared...');

    // Create a default user
    const user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123'
    });
    console.log('Default user created (admin@example.com / password123)');

    // Add user ID to sample jobs
    const jobsWithUser = sampleJobs.map(job => ({
      ...job,
      user: user._id
    }));

    await Job.insertMany(jobsWithUser);
    console.log(`${jobsWithUser.length} sample jobs inserted successfully!`);

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
