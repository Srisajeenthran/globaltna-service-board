const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Attempting to connect to:', process.env.MONGO_URI.split('@')[1]); // Log host only for safety
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ SUCCESS: Database connected correctly!');
    process.exit(0);
  } catch (error) {
    console.error('❌ FAILURE: Could not connect to database.');
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

testConnection();
