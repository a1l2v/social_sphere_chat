const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/events');
const chatroomRoutes = require('./routes/chatrooms');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/users'); // Include user routes
const registrationRoutes = require('./routes/registration'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collegeChat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/chatrooms', chatroomRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes); // Add user routes
app.use('/api', registrationRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
