const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();
// const route = express.Router()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


// Middleware for handling file uploads
app.use(fileUpload());

//import route

app.use((req, res, next) =>{
  // const error = new Error("Not found")
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
  next()
})

// bodyparser is deprecate
// app.use(bodyParser.urlencoded({extended : false}))
// app.use(bodyParser.json())
// app.use(express.urlencoded(({ extended: true })))
// app.use(express.json())
// Increase the limit (default is 100kb)
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// MySQL connection configuration
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'hrsystem'
});

// Connect to MySQL
connection.getConnection(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

app.get('/product', (req, res) => {
  res.send('<h1>Hello world</h1>')
  console.log('cc product')
})
app.post('/personal', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].empCode, req.body[i].name, req.body[i].bankaccount])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO employee (emp_code, name, bank_account_number) VALUES ?';
      var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
      console.log('dataSQL', sql)
      console.log('dataROWs', [rows])
      if (err) throw err
      connection.query(sql, [rows], (err, result, fields) => {
        console.log('sql queryplan')
        console.log('result is :', result)
        console.log('fields is :', result)
        if (err) {
          console.error('Error inserting rows:', err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(`Inserted ${result.affectedRows} rows successfully`);
          res.status(200).send('Data inserted successfully');
        } 
      con.release()
      })
    })
    console.log('done selected')
})

app.get('/personals', (req, res) => {
  connection.getConnection((err, con) => {
      if (err) throw err
      connection.query("SELECT * FROM employee", (err, result, fields) => {
        if (err) throw err
          console.log('sql queryplan')
          console.log('result is :', result)
          console.log('fields is :', result)
          if (err) {
            console.error('Error inserting rows:', err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(`Inserted ${result.affectedRows} rows successfully`);
            res.status(200).json({
              result: result
            });
          } 
        con.release()
      })
    })
    console.log('done selected')
})

app.post('/welfare', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO welfare (TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, OT_HOURS, DEPARTURE_POINT, DEPARTURE_DATETIME, YARDOUTDATE, DRIVER1, NAME, DRIVER2, NULLS, DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG) VALUES ?';
      var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
      console.log('dataSQL', sql)
      console.log('dataROWs', [rows])
      if (err) throw err
      connection.query(sql, [rows], (err, result, fields) => {
        console.log('sql queryplan')
        console.log('result is :', result)
        console.log('fields is :', result)
        if (err) {
          console.error('Error inserting rows:', err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(`Inserted ${result.affectedRows} rows successfully`);
          res.status(200).send('Data inserted successfully');
        } 
      con.release()
      })
    })
    console.log('done selected')
})

app.get('/welfares', (req, res) => {
  connection.getConnection((err, con) => {
      if (err) throw err
      connection.query("SELECT * FROM employee", (err, result, fields) => {
        if (err) throw err
          console.log('sql queryplan')
          console.log('result is :', result)
          console.log('fields is :', result)
          if (err) {
            console.error('Error inserting rows:', err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(`Inserted ${result.affectedRows} rows successfully`);
            res.status(200).json({
              result: result
            });
          } 
        con.release()
      })
    })
    console.log('done selected')
})

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

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, (req, res, next) => {
  const host = server.address().address
  const port = server.address().port
  console.log('Server is running on port : ' + PORT)
})