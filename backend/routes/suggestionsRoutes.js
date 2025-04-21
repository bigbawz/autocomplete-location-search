import express from 'express';
import { getSuggestions } from '../controllers/suggestionsController.js';;

const router = express.Router();

// GET route for /suggestions
router.get('/', getSuggestions);

export default router;