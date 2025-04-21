import express from 'express';
import 'dotenv/config';
import suggestionsRoutes from './routes/suggestionsRoutes.js';
import errorHandler from './middleware/error.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.resolve(__dirname, '../', 'frontend', 'build', 'index.html');

const app = express();

const PORT = process.env.PORT || 8080;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Use the suggestions routes
app.use('/suggestions', suggestionsRoutes);

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
    app.get('/', (req, res) => res.sendFile(indexPath));
} else {
    app.get('/', (req, res) => res.send('Please set to production mode'))
}

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));