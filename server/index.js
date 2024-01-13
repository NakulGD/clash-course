const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { courseName, semester } = req.body;
  const dept = courseName.split(' ')[0];
  const course = courseName.split(' ')[1];
  const url = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${dept}&course=${course}`;
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const courseSections = [];

    $('tr[class^="section"]').each((i, elem) => {
      const term = $(elem).find('td').eq(3).text().trim();
      const activity = $(elem).find('td').eq(2).text().trim();

      
      if (term === semester && activity !== "Waiting List") { // Match the term with user-selected term

        // Assuming fullSectionCode is 'CPSC 320 101' or similar
        const fullSectionCode = $(elem).find('a').first().text().trim();
        const parts = fullSectionCode.split(' '); // Split the string into an array by spaces
        const sectionCode = parts[parts.length - 1]; // Take the last element of the array which should be '101', 'T1A', etc.

        
        // Correct the Days, Start Time and End Time extraction
        const days = $(elem).find('td').eq(6).text().trim();
        const startTime = $(elem).find('td').eq(7).text().trim();
        const endTime = $(elem).find('td').eq(8).text().trim();

        console.log(`Section Code: ${sectionCode}, Activity: ${activity}, Days: ${days}, Start Time: ${startTime}, End Time: ${endTime}`);

        courseSections.push({
          fullSectionCode,
          sectionCode,
          activity, // This will be 'Lecture', 'Tutorial', etc.
          days, // This will be 'Mon', 'Tue', etc.
          startTime, // This will be '14:00', '9:00', etc.
          endTime // This will be '15:00', '10:00', etc.
        });
      }
    });

    
    res.json(courseSections);
  } catch (error) {
    console.error('Error occurred while scraping', error);
    res.status(500).send('Error occurred while scraping');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
