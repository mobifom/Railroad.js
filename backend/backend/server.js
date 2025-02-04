const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const railroadMiddleware = require('./middleware/railroadMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');
const railroadRoutes = require('./api/railroadRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(rateLimitMiddleware);
app.use(railroadMiddleware);

// Routes
app.use('/api/railroad', authMiddleware, railroadRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});