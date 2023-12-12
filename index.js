const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();

// Middleware for handling file uploads
app.use(fileUpload());

// MySQL connection configuration
const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API endpoint for handling file upload
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const filePath = __dirname + '/uploads/' + file.name;

  file.mv(filePath, err => {
    if (err) {
      return res.status(500).send(err);
    }

    // Process the Excel file and insert data into MySQL
    processExcel(filePath);

    res.send('File uploaded!');
  });
});

// Function to process Excel file and insert data into MySQL
function processExcel(filePath) {
  // Use a library like 'xlsx' to read the Excel file and extract data
  // Insert the data into MySQL using the 'mysql' library
  // Example:
  // const workbook = xlsx.readFile(filePath);
  // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // ... process data ...
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});