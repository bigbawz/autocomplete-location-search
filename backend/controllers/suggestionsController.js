import fs from 'fs/promises';
import path, { parse } from 'path';
import 'dotenv/config';
import Papa from 'papaparse'; // Parsing library
import asyncHandler from 'express-async-handler';
import Fuse from 'fuse.js'; // Fuzzy-search library for finding approximate results based on the given input
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../', 'data', 'cities_canada-usa.tsv');

// @desc    Find city suggestions
// @routes  GET /suggestions?name={searchKey}
// @access  Public
export const getSuggestions = asyncHandler(async (req, res) => {
    const { name } = req.query;
    
    // For testing
    // const searchQuery = 'Lon';
    
    try {
        const tsvFile = await fs.readFile(filePath, 'utf-8');
        const parsedFile = Papa.parse(tsvFile, {
            delimiter: '\t', 
            header: true, // convert rows to objects using the first row as key
        });

        // Filter out empty names in the .tsv file
        const cityData = parsedFile.data.filter(city => city.name && city.name.toLowerCase());

        // Initialize Fuse
        const fuse = new Fuse(cityData, {
            keys: ['name'],
            threshold: 0.3, // adjust the threshold to control fuzziness
            includeScore: true,
        });

        // Perform search
        const searchResults = fuse.search(name);

        // Map the search results 
        const sortedData = searchResults.map(city => ({
            name: city.item.name,
            lat: city.item.lat,
            long: city.item.long,
            score: 1 - city.score.toFixed(5), // round to 5 decimal places
        }));

        // For debugging
        // console.log('Search Results: ', sortedData);

        if (sortedData.length > 0) {
            res.status(200).json({ sortedData });
        } else {
            res.status(400).json({ message: 'Data not found for the given city'});
        }

        
    } catch (error) {
        throw new Error('Unable to read data')
    }
});
